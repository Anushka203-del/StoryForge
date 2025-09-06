// filename: seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const { Types } = mongoose;

// Add connection debugging
mongoose.set('debug', true);

// More robust connection handling
async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/storyforge_db';
        console.log('🔗 Connecting to MongoDB:', uri);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ MongoDB connected successfully');
        console.log('📍 Database name:', mongoose.connection.db.databaseName);

        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log('🏓 Database ping successful');

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

// Define schemas with required fields to avoid validation issues
const abstractSchema = new mongoose.Schema({
    abs_title: String,
    abs_text: String,
    ai_id: String,
    image: String,
    created_at: { type: Date, default: Date.now }
}, { strict: false });

const userSchema = new mongoose.Schema({
    display_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    wallet_address: String,
    level: { type: Number, default: 0 },
    coins: { type: Number, default: 50 },
    liked_chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    voter: { type: Boolean, default: false },
    voted_chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    refresh_token: String,
    stats: {
        chapters_read: { type: Number, default: 0 },
        books_completed: { type: Number, default: 0 },
        chapters_written: { type: Number, default: 0 },
        canon_chapters_won: { type: Number, default: 0 }
    },
    currently_reading: [{
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
        last_read_chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
        last_read_date: { type: Date, default: Date.now }
    }],
    writing_drafts: [{
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
        title: String,
        content: String,
        last_saved: { type: Date, default: Date.now }
    }]
}, { strict: false });

const booksSchema = new mongoose.Schema({
    base_abstract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Abstract' },
    abstract_text: String,
    genre: String,
    title: String,
    image: String,
    total_contributers: { type: Number, default: 0 },
    total_chapters: { type: Number, default: 0 },
    current_chapter: { type: Number, default: 0 },
    status: { type: String, enum: ['Ongoing', 'Completed'] },
    canon_chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
}, { strict: false });

const chapterSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chapter_number: Number,
    title: String,
    content: String,
    is_canon: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    alt_rank: Number,
    votes: { type: Number, default: 0 }
}, { strict: false });

const commentSchema = new mongoose.Schema({
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    likes: { type: Number, default: 0 },
    reply_to: String,
    created_at: { type: Date, default: Date.now }
}, { strict: false });

const minibitesSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quote: String,
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

const storyBlockSchema = new mongoose.Schema({
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    block_text: String,
    tags: [String],
    block_type: {
        type: String,
        enum: ['characters', 'settings', 'plot-points', 'conflicts', 'themes', 'custom']
    },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

// Create models
const AbstractModel = mongoose.model('Abstract', abstractSchema);
const BooksModel = mongoose.model('Books', booksSchema);
const ChapterModel = mongoose.model('Chapter', chapterSchema);
const CommentModel = mongoose.model('Comment', commentSchema);
const MiniBitesModel = mongoose.model('MiniBites', minibitesSchema);
const StoryBlockModel = mongoose.model('StoryBlock', storyBlockSchema);
const UserModel = mongoose.model('User', userSchema);

// Generate consistent ObjectIds
console.log('🎲 Generating ObjectIds...');
const ids = {
    users: Array.from({ length: 5 }, () => new Types.ObjectId()),
    abstracts: Array.from({ length: 5 }, () => new Types.ObjectId()),
    books: Array.from({ length: 5 }, () => new Types.ObjectId()),
    chapters: Array.from({ length: 5 }, () => new Types.ObjectId()),
    comments: Array.from({ length: 5 }, () => new Types.ObjectId()),
    minibites: Array.from({ length: 5 }, () => new Types.ObjectId()),
    storyblocks: Array.from({ length: 5 }, () => new Types.ObjectId()),
};

console.log('📋 Sample IDs generated:');
console.log('  User 0:', ids.users[0].toString());
console.log('  Abstract 0:', ids.abstracts[0].toString());
console.log('  Book 0:', ids.books[0].toString());

// Data arrays (same as yours but with logging)
const abstracts = [
    { _id: ids.abstracts[0], abs_title: 'AI and the City', abs_text: 'A look at how AI integrates into urban infrastructure and daily life.', ai_id: 'AI-URB-001', image: 'https://cdn.example.com/abstracts/ai-city.jpg', created_at: new Date('2025-08-27T07:15:00Z') },
    { _id: ids.abstracts[1], abs_title: 'Quantum Sparks', abs_text: 'Exploring the edge where quantum computing meets machine learning.', ai_id: 'AI-QML-002', image: 'https://cdn.example.com/abstracts/quantum.jpg', created_at: new Date('2025-08-29T07:15:00Z') },
    { _id: ids.abstracts[2], abs_title: 'MedBots', abs_text: 'Robotic assistants transforming hospital workflows and patient care.', ai_id: 'AI-MED-003', image: 'https://cdn.example.com/abstracts/medbots.jpg', created_at: new Date('2025-08-31T07:15:00Z') },
    { _id: ids.abstracts[3], abs_title: 'Finance 2040', abs_text: 'Predictive AI models redefining risk and investment strategies.', ai_id: 'AI-FIN-004', image: 'https://cdn.example.com/abstracts/fin2040.jpg', created_at: new Date('2025-09-02T07:15:00Z') },
    { _id: ids.abstracts[4], abs_title: 'Cinematic Algorithms', abs_text: 'How AI co-writes scripts and personalizes storytelling.', ai_id: 'AI-ENT-005', image: 'https://cdn.example.com/abstracts/cinema.jpg', created_at: new Date('2025-09-04T07:15:00Z') },
];

const users = [
    { _id: ids.users[0], display_name: 'Jane Doe', username: 'janedoe', wallet_address: '0x3a1fbd22cF8b9fA7e5D1c4aB8E2f7c9d1a2b3c4d', email: 'jane@example.com', password: '$2a$10$examplehashedpasswordJane', level: 3, coins: 120, liked_chapters: [ids.chapters[0], ids.chapters[2]], library: [ids.chapters[1], ids.chapters[3]], voter: true, voted_chapters: [ids.chapters[0]], refresh_token: 'rtok_jane_sample', stats: { chapters_read: 42, books_completed: 3, chapters_written: 5, canon_chapters_won: 1 }, currently_reading: [{ book_id: ids.books[0], last_read_chapter: ids.chapters[0], last_read_date: new Date('2025-09-05T05:15:00Z') }], writing_drafts: [{ book_id: ids.books[0], title: 'AI Awakens - Draft', content: 'Draft ideas about AI self-awareness...', last_saved: new Date('2025-09-05T21:15:00Z') }] },
    { _id: ids.users[1], display_name: 'Arjun Mehta', username: 'arjunm', wallet_address: '0x8b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c', email: 'arjun@example.com', password: '$2a$10$examplehashedpasswordArjun', level: 5, coins: 300, liked_chapters: [ids.chapters[1]], library: [ids.chapters[2]], voter: true, voted_chapters: [ids.chapters[1], ids.chapters[2]], refresh_token: 'rtok_arjun_sample', stats: { chapters_read: 87, books_completed: 6, chapters_written: 14, canon_chapters_won: 4 }, currently_reading: [{ book_id: ids.books[1], last_read_chapter: ids.chapters[2], last_read_date: new Date('2025-09-03T07:15:00Z') }], writing_drafts: [] },
    { _id: ids.users[2], display_name: 'Mina Park', username: 'minap', wallet_address: '0x0f1e2d3c4b5a69788776655443322110ffeeddcc', email: 'mina@example.com', password: '$2a$10$examplehashedpasswordMina', level: 2, coins: 75, liked_chapters: [], library: [ids.chapters[4]], voter: false, voted_chapters: [], refresh_token: 'rtok_mina_sample', stats: { chapters_read: 18, books_completed: 1, chapters_written: 2, canon_chapters_won: 0 }, currently_reading: [], writing_drafts: [] },
    { _id: ids.users[3], display_name: 'Leo Martins', username: 'leom', wallet_address: '0xaabbccddeeff00112233445566778899aabbccdd', email: 'leo@example.com', password: '$2a$10$examplehashedpasswordLeo', level: 1, coins: 40, liked_chapters: [ids.chapters[3]], library: [], voter: false, voted_chapters: [], refresh_token: 'rtok_leo_sample', stats: { chapters_read: 9, books_completed: 0, chapters_written: 0, canon_chapters_won: 0 }, currently_reading: [], writing_drafts: [] },
    { _id: ids.users[4], display_name: 'Sara Khan', username: 'sarak', wallet_address: '0xffeeddccbbaa99887766554433221100a1b2c3d4', email: 'sara@example.com', password: '$2a$10$examplehashedpasswordSara', level: 4, coins: 210, liked_chapters: [ids.chapters[0], ids.chapters[1]], library: [ids.chapters[0], ids.chapters[1], ids.chapters[2]], voter: true, voted_chapters: [ids.chapters[0], ids.chapters[1]], refresh_token: 'rtok_sara_sample', stats: { chapters_read: 63, books_completed: 4, chapters_written: 7, canon_chapters_won: 2 }, currently_reading: [{ book_id: ids.books[2], last_read_chapter: ids.chapters[1], last_read_date: new Date('2025-09-06T02:15:00Z') }], writing_drafts: [{ book_id: ids.books[3], title: 'Shadow City - Draft', content: 'Drafting a noir sci-fi chapter...', last_saved: new Date('2025-09-04T07:15:00Z') }] },
];

const books = [
    { _id: ids.books[0], base_abstract_id: ids.abstracts[0], abstract_text: 'A metropolis where AI runs transit, energy, and security.', genre: 'Science Fiction', title: 'Neon Circuit', image: 'https://cdn.example.com/books/neon-circuit.jpg', total_contributers: 7, total_chapters: 20, current_chapter: 5, status: 'Ongoing', canon_chapters: [] },
    { _id: ids.books[1], base_abstract_id: ids.abstracts[1], abstract_text: 'A breakthrough links qubits and neural nets with unintended effects.', genre: 'Tech Thriller', title: 'Superposition', image: 'https://cdn.example.com/books/superposition.jpg', total_contributers: 4, total_chapters: 12, current_chapter: 8, status: 'Ongoing', canon_chapters: [] },
    { _id: ids.books[2], base_abstract_id: ids.abstracts[2], abstract_text: 'Hospitals adopt swarm robotics to triage emergencies.', genre: 'Near-Future', title: 'Triage Protocol', image: 'https://cdn.example.com/books/triage-protocol.jpg', total_contributers: 6, total_chapters: 15, current_chapter: 10, status: 'Ongoing', canon_chapters: [] },
    { _id: ids.books[3], base_abstract_id: ids.abstracts[3], abstract_text: 'Hedge funds compete with sentient trading agents.', genre: 'Finance', title: 'Black Box Street', image: 'https://cdn.example.com/books/black-box-street.jpg', total_contributers: 5, total_chapters: 18, current_chapter: 12, status: 'Ongoing', canon_chapters: [] },
    { _id: ids.books[4], base_abstract_id: ids.abstracts[4], abstract_text: 'An AI scriptwriter learns from billions of viewer choices.', genre: 'Drama', title: "Director's Cut", image: 'https://cdn.example.com/books/directors-cut.jpg', total_contributers: 8, total_chapters: 22, current_chapter: 20, status: 'Completed', canon_chapters: [] },
];

const chapters = [
    { _id: ids.chapters[0], book_id: ids.books[0], user_id: ids.users[0], chapter_number: 1, title: 'Boot Sequence', content: 'City systems hum awake as the AI calibrates traffic and grids.', is_canon: true, created_at: new Date('2025-08-30T07:15:00Z'), alt_rank: 1, votes: 23 },
    { _id: ids.chapters[1], book_id: ids.books[1], user_id: ids.users[1], chapter_number: 2, title: 'Entangled', content: "A lab test entangles a model's weights with a qubit register.", is_canon: true, created_at: new Date('2025-08-31T07:15:00Z'), alt_rank: 2, votes: 31 },
    { _id: ids.chapters[2], book_id: ids.books[1], user_id: ids.users[4], chapter_number: 3, title: 'Decoherence', content: 'Noise leaks into the model, spawning unpredictable outputs.', is_canon: false, created_at: new Date('2025-09-01T07:15:00Z'), alt_rank: 5, votes: 12 },
    { _id: ids.chapters[3], book_id: ids.books[2], user_id: ids.users[2], chapter_number: 1, title: 'Code Blue', content: 'Swarm bots deploy in an ER drill to optimize triage.', is_canon: true, created_at: new Date('2025-09-02T07:15:00Z'), alt_rank: 3, votes: 19 },
    { _id: ids.chapters[4], book_id: ids.books[4], user_id: ids.users[3], chapter_number: 20, title: 'Final Cut', content: 'The AI director chooses an ending no human predicted.', is_canon: true, created_at: new Date('2025-09-05T07:15:00Z'), alt_rank: 1, votes: 54 },
];

const comments = [
    { _id: ids.comments[0], chapter_id: ids.chapters[0], user_id: ids.users[4], text: 'Love how the city feels like a character itself!', likes: 6, reply_to: null, created_at: new Date('2025-08-30T11:15:00Z') },
    { _id: ids.comments[1], chapter_id: ids.chapters[1], user_id: ids.users[0], text: 'That entanglement twist was wild—more please.', likes: 9, reply_to: ids.comments[0].toString(), created_at: new Date('2025-08-31T19:15:00Z') },
    { _id: ids.comments[2], chapter_id: ids.chapters[2], user_id: ids.users[1], text: 'Decoherence felt a bit rushed but intriguing.', likes: 3, reply_to: null, created_at: new Date('2025-09-01T23:15:00Z') },
    { _id: ids.comments[3], chapter_id: ids.chapters[3], user_id: ids.users[3], text: 'ER drill details were spot on!', likes: 2, reply_to: null, created_at: new Date('2025-09-03T04:15:00Z') },
    { _id: ids.comments[4], chapter_id: ids.chapters[4], user_id: ids.users[2], text: 'Perfect ending—chills.', likes: 11, reply_to: null, created_at: new Date('2025-09-05T06:15:00Z') },
];

const minibites = [
    { _id: ids.minibites[0], book_id: ids.books[0], chapter_id: ids.chapters[0], created_by: ids.users[0], quote: 'The grid is alive, and it listens.', likes: 14, created_at: new Date('2025-08-30T07:15:00Z') },
    { _id: ids.minibites[1], book_id: ids.books[1], chapter_id: ids.chapters[1], created_by: ids.users[1], quote: 'We weighed the wavefunction—and it stared back.', likes: 21, created_at: new Date('2025-08-31T07:15:00Z') },
    { _id: ids.minibites[2], book_id: ids.books[1], chapter_id: ids.chapters[2], created_by: ids.users[4], quote: 'Noise is just a story the universe tells.', likes: 7, created_at: new Date('2025-09-01T07:15:00Z') },
    { _id: ids.minibites[3], book_id: ids.books[2], chapter_id: ids.chapters[3], created_by: ids.users[2], quote: 'Triage is a chorus, not a solo.', likes: 5, created_at: new Date('2025-09-02T07:15:00Z') },
    { _id: ids.minibites[4], book_id: ids.books[4], chapter_id: ids.chapters[4], created_by: ids.users[3], quote: 'Endings are choices no model can predict.', likes: 29, created_at: new Date('2025-09-05T07:15:00Z') },
];

const storyblocks = [
    { _id: ids.storyblocks[0], author_id: ids.users[0], title: 'Alex Kaur', block_text: 'Transit AI lead, morally driven, Punjabi diaspora roots.', tags: ['character', 'lead', 'engineer'], block_type: 'characters', created_at: new Date('2025-08-28T07:15:00Z') },
    { _id: ids.storyblocks[1], author_id: ids.users[1], title: 'The Q-Lab', block_text: 'Sub-basement lab with cryo racks and Faraday cage halls.', tags: ['setting', 'lab', 'quantum'], block_type: 'settings', created_at: new Date('2025-08-29T07:15:00Z') },
    { _id: ids.storyblocks[2], author_id: ids.users[2], title: 'Blackout', block_text: 'Citywide outage hides a data heist by a rival AI.', tags: ['plot', 'heist', 'twist'], block_type: 'plot-points', created_at: new Date('2025-08-30T07:15:00Z') },
    { _id: ids.storyblocks[3], author_id: ids.users[3], title: 'Ethics Committee', block_text: 'A council debates algorithmic transparency vs. security.', tags: ['theme', 'ethics', 'governance'], block_type: 'themes', created_at: new Date('2025-08-31T07:15:00Z') },
    { _id: ids.storyblocks[4], author_id: ids.users[4], title: 'Shadow Fork', block_text: 'A clandestine fork of the AI trained on black-market data.', tags: ['conflict', 'antagonist', 'ai'], block_type: 'conflicts', created_at: new Date('2025-09-01T07:15:00Z') },
];

// Set canon chapters after chapters are defined
books[0].canon_chapters = [ids.chapters[0]];
books[1].canon_chapters = [ids.chapters[1]];
books[2].canon_chapters = [ids.chapters[3]];
books[4].canon_chapters = [ids.chapters[4]];

async function insertData() {
    try {
        console.log('🧹 Cleaning existing data...');

        // Clean existing documents with more detailed logging
        const deleteResults = await Promise.all([
            AbstractModel.deleteMany({}),
            UserModel.deleteMany({}),
            BooksModel.deleteMany({}),
            ChapterModel.deleteMany({}),
            CommentModel.deleteMany({}),
            MiniBitesModel.deleteMany({}),
            StoryBlockModel.deleteMany({})
        ]);

        console.log('🗑️ Deleted documents:', {
            abstracts: deleteResults[0].deletedCount,
            users: deleteResults[1].deletedCount,
            books: deleteResults[2].deletedCount,
            chapters: deleteResults[3].deletedCount,
            comments: deleteResults[4].deletedCount,
            minibites: deleteResults[5].deletedCount,
            storyblocks: deleteResults[6].deletedCount
        });

        console.log('📥 Inserting new data...');

        // Insert in dependency order with individual try-catch
        console.log('  📄 Inserting abstracts...');
        const abstractsResult = await AbstractModel.insertMany(abstracts);
        console.log(`    ✅ ${abstractsResult.length} abstracts inserted`);

        console.log('  👤 Inserting users...');
        const usersResult = await UserModel.insertMany(users);
        console.log(`    ✅ ${usersResult.length} users inserted`);

        console.log('  📚 Inserting books...');
        const booksResult = await BooksModel.insertMany(books);
        console.log(`    ✅ ${booksResult.length} books inserted`);

        console.log('  📖 Inserting chapters...');
        const chaptersResult = await ChapterModel.insertMany(chapters);
        console.log(`    ✅ ${chaptersResult.length} chapters inserted`);

        console.log('  💬 Inserting comments...');
        const commentsResult = await CommentModel.insertMany(comments);
        console.log(`    ✅ ${commentsResult.length} comments inserted`);

        console.log('  🍯 Inserting minibites...');
        const minibitesResult = await MiniBitesModel.insertMany(minibites);
        console.log(`    ✅ ${minibitesResult.length} minibites inserted`);

        console.log('  🧩 Inserting story blocks...');
        const storyblocksResult = await StoryBlockModel.insertMany(storyblocks);
        console.log(`    ✅ ${storyblocksResult.length} story blocks inserted`);

        return {
            abstracts: abstractsResult.length,
            users: usersResult.length,
            books: booksResult.length,
            chapters: chaptersResult.length,
            comments: commentsResult.length,
            minibites: minibitesResult.length,
            storyblocks: storyblocksResult.length
        };

    } catch (error) {
        console.error('💥 Error during data insertion:', error);
        throw error;
    }
}

async function verifyData() {
    try {
        console.log('🔍 Verifying inserted data...');

        const counts = await Promise.all([
            AbstractModel.countDocuments(),
            UserModel.countDocuments(),
            BooksModel.countDocuments(),
            ChapterModel.countDocuments(),
            CommentModel.countDocuments(),
            MiniBitesModel.countDocuments(),
            StoryBlockModel.countDocuments()
        ]);

        const verification = {
            abstracts: counts[0],
            users: counts[1],
            books: counts[2],
            chapters: counts[3],
            comments: counts[4],
            minibites: counts[5],
            storyblocks: counts[6]
        };

        console.log('📊 Current document counts:', verification);

        // Sample a few documents to verify they exist
        const sampleUser = await UserModel.findOne({ username: 'janedoe' });
        const sampleBook = await BooksModel.findOne({ title: 'Neon Circuit' });
        const sampleBlock = await StoryBlockModel.findOne({ title: 'Alex Kaur' });

        console.log('🎯 Sample verification:');
        console.log('  User found:', sampleUser ? sampleUser.display_name : 'NOT FOUND');
        console.log('  Book found:', sampleBook ? sampleBook.title : 'NOT FOUND');
        console.log('  Story block found:', sampleBlock ? sampleBlock.title : 'NOT FOUND');

        return verification;

    } catch (error) {
        console.error('❌ Error during verification:', error);
        throw error;
    }
}

async function main() {
    try {
        await connectDB();
        const insertResults = await insertData();
        const verificationResults = await verifyData();

        console.log('\n🎉 SEEDING COMPLETED SUCCESSFULLY!');
        console.log('📊 Final Summary:');
        console.log(`   - ${verificationResults.abstracts} abstracts`);
        console.log(`   - ${verificationResults.users} users`);
        console.log(`   - ${verificationResults.books} books`);
        console.log(`   - ${verificationResults.chapters} chapters`);
        console.log(`   - ${verificationResults.comments} comments`);
        console.log(`   - ${verificationResults.minibites} minibites`);
        console.log(`   - ${verificationResults.storyblocks} story blocks`);
        console.log('\n🏁 Database seeded and verified successfully!');

    } catch (error) {
        console.error('\n❌ SEEDING FAILED:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the script
main();
