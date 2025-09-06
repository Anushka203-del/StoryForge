const User = require("../models/users.model");
const asyncHandler = require("../utils/async_handler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const jwt = require("jsonwebtoken");
const Chapter = require("../models/chapter.model");

const generateAccessRefreshToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    const access_token = await user.generate_access_token();
    const refresh_token = await user.generate_refresh_token();
    user.refresh_token = refresh_token;
    user.save();
    return { access_token, refresh_token };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { display_name, username, wallet_address, email, password } = req.body;

  //if(display_name == "" || wallet_address == "" || email == "" || password == "") {
  //   throw new ApiError( 400,"name is missing")
  //}
  if (
    [display_name, username, wallet_address, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "data is missing");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }, { wallet_address }],
  });
  console.log(user);

  if (user) {
    throw new ApiError(
      409,
      "user with this email or wallet address already exists"
    );
  }
  const new_user = await User.create({
    display_name,
    username,
    wallet_address,
    email,
    password,
  });
  const created_user = await User.findById(new_user._id).select("-password");
  if (!created_user) {
    throw new ApiError(500, "internal server error");
  }
  const response = new ApiResponse(
    201,
    created_user,
    "user successfully registered"
  );
  return res.status(201).json(response);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "both email and password is required");
  }
  console.log(req.body);
  const user = await User.findOne({ email }).select(" -refresh_token");
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const is_password_correct = await user.validate_password(password);
  if (!is_password_correct) {
    throw new ApiError(401, "wrong user credentials");
  }
  //to filter and return objecct
  const { access_token, refresh_token } = await generateAccessRefreshToken(
    user._id
  );
  // user
  const give_response = new ApiResponse(
    200,
    {
      user: user,
      access_token: access_token,
      refresh_token: refresh_token,
    },
    (message = " successfully logged in")
  );
  const cookie_options = {
    httpOnly: true, //for not letting anyone changes this from frontend
    secure: true,
  };
  return res
    .status(200)
    .cookie("access_token", access_token, cookie_options)
    .cookie("refresh_token", refresh_token, cookie_options)
    .json(give_response);
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refresh_token: 1 } },
    { new: true }
  ); //by default findbyidand update returns doc before updating by setting new - true, it will return doc after updating
  const cookie_options = {
    httpOnly: true, //for not letting anyone changes this from frontend
    secure: true,
  };
  const give_response = new ApiResponse(200, {}, "logged out successfully");
  return res
    .status(200)
    .clearCookie("access_token", cookie_options)
    .clearCookie("refresh_token", cookie_options)
    .json(give_response);
});

const generateNewAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookie?.refresh_token || req.body.refresh_token;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "missing parameter refresh_token");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodedToken) {
    throw new ApiError(400, "invalid refresh_token");
  }
  const user_id = decodedToken._id;

  const user = await User.findById(user_id);
  if (user.refresh_token !== incomingRefreshToken) {
    throw new ApiError(400, "invalid or expired refresh token");
  }
  const { access_token, refresh_token } = await generateAccessRefreshToken(
    user_id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new ApiResponse(
        200,
        {
          access_token: access_token,
          refresh_token: refresh_token,
        },
        "new refresh token and access token generated"
      )
    );
});

const change_password = asyncHandler(async (req, res) => {
  const { email, password, new_password } = req.body;
  const user = await User.findOne({ email });
  const is_password_right = await user.validate_password(password);
  if (!is_password_right) {
    throw new ApiError(401, "password is incorrect");
  }

  user.password = new_password;
  await user.save();

  const response = new ApiResponse(
    200,
    {},
    (message = "password successfully changed")
  );
  return res.status(200).json(response);
});

const checkNameUniqueness = asyncHandler(async (req, res) => {
  const { username } = req.query_params;
  if (!username) {
    throw new ApiError(400, "missing parameter");
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json(new ApiResponse(400, "username already exist"));
  } else {
    return res.status(200).json(new ApiResponse(200, "username available"));
  }
});

const updateReadProgress = async (req, res) => {
  const { bookId, chapterId, chapterNumber } = req.body;
  const userId = req.user._id;

  if (!bookId || !chapterId) {
    return res.status(400).json({ message: "Book ID and Chapter ID are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the book in the user's 'currently_reading' list
    const bookInProgress = user.currently_reading.find(
      (book) => book.book_id.toString() === bookId
    );

    if (bookInProgress) {
      // If the user is already reading this book, update the last read chapter
      await User.updateOne(
        { _id: userId, "currently_reading.book_id": bookId },
        {
          $set: {
            "currently_reading.$.last_read_chapter": chapterId,
            "currently_reading.$.last_read_date": new Date(),
          },
          $inc: { "stats.chapters_read": 1 }
        }
      );
    } else {
      // If this is the first chapter of the book they're reading, add it to the list
      await User.findByIdAndUpdate(userId, {
        $push: {
          currently_reading: {
            book_id: bookId,
            last_read_chapter: chapterId,
          },
        },
        $inc: { "stats.chapters_read": 1 }
      });
    }

    // Optional: Check if the book is now completed
    const book = await Books.findById(bookId);
    if (book.status === "Completed" && book.total_chapters === chapterNumber) {
      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.books_completed": 1 },
        // Move from currently_reading to book_shelf
        $pull: { currently_reading: { book_id: bookId } },
        $addToSet: { book_shelf: bookId } // Use $addToSet to avoid duplicates
      });
    }

    res.status(200).json({ message: "Reading progress updated successfully." });

  } catch (error) {
    console.error("Error updating read progress:", error);
    res.status(500).json({ message: "Server error while updating progress." });
  }
};

const getUserDrafts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("writing_drafts");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const response = new ApiResponse(
    200,
    { drafts: user.writing_drafts },
    "Drafts fetched successfully."
  );

  return res.status(200).json(response);
});

const saveOrUpdateDraft = asyncHandler(async (req, res) => {
  const { draftId, bookId, title, content } = req.body;
  const userId = req.user._id;

  // A draft must be associated with a book
  if (!bookId) {
    throw new ApiError(400, "Book ID is required to save a draft.");
  }

  let response;

  if (draftId) {
    // --- UPDATE EXISTING DRAFT ---
    const result = await User.updateOne(
      { _id: userId, "writing_drafts._id": draftId },
      {
        $set: {
          "writing_drafts.$.title": title,
          "writing_drafts.$.content": content,
          "writing_drafts.$.last_saved": new Date(),
        }
      }
    );

    if (result.nModified === 0) {
      throw new ApiError(404, "Draft not found or user not authorized.");
    }

    response = new ApiResponse(
      200,
      { draftId },
      "Draft updated successfully."
    );

  } else {
    // --- CREATE NEW DRAFT ---
    const newDraft = { book_id: bookId, title, content };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { writing_drafts: newDraft } },
      { new: true, select: "writing_drafts" } // Return only the drafts array
    );

    // Get the ID of the draft we just created
    const createdDraft = updatedUser.writing_drafts[updatedUser.writing_drafts.length - 1];

    response = new ApiResponse(
      201,
      { draftId: createdDraft._id },
      "Draft saved successfully."
    );
  }

  return res.status(response.statusCode).json(response);
});


const voteChapter = asyncHandler(async (req, res) => {
  const chapter_id = req.body.chapter_id
  const user_id = req.user._id;
  const user = await User.findById(user_id)
  if (!user.voter) {
    return res.status(400).json(new ApiResponse(400, {}, "User is not a voter"))
  }
  const chapter = await Chapter.findById(chapter_id);
  chapter.votes = chapter.votes + 1;
  user.voted_chapters.push(chapter_id);
  chapter.save();
  user.save();
  return res.status(200).json(new ApiResponse(200, {}, "Vote Casted"))
})

const addToLibrary = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const book_id = req.body.book_id;
  const user = await User.findById(user_id);
  user.library.push(book_id);
  user.save();
  return res.status(200).json(new ApiResponse(200, {}, "Book successfully added to library"))
})



module.exports = {
  register,
  login,
  logout,
  generateNewAccessToken,
  change_password,
  checkNameUniqueness,
  updateReadProgress,
  getUserDrafts,
  saveOrUpdateDraft,
  voteChapter,
  addToLibrary

};
