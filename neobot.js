const TeleBot = require('telebot');
const schedule = require('node-schedule');
const petImage = require('neopet-image-finder');
const bot = new TeleBot({
	token: process.env.TELEGRAM_TOKEN || '1702325572:AAHfZFX3uBI6mA5V5cAsOR9QpxAITDuz7PU',
	usePlugins: ['commandButton'],
	webhook: { // Optional. Use webhook instead of polling.
        url: process.env.APP_URL || 'https://neoptes.herokuapp.com:443', // HTTPS url to send updates to.
        host: '0.0.0.0', // Webhook server host.
        port: process.env.PORT || 443
    },
});
//neohelp command
bot.on('/neohelp', function (msg) {
	let parseMode = 'MarkdownV2';
	let text = 'Not sure how to Neopets? Confused by all the weird new stuff? [Check here\\!](https://www.reddit.com/r/neopets/comments/kkfpik/are_you_returning_or_even_new_to_neopets_check/)';

    return bot.sendMessage(msg.chat.id, text, {parseMode});

});
//info command
bot.on('/info', function (msg) {
	let parseMode = 'MarkdownV2';
	let webPreview = false;
	let text = '[Click here](https://docs.google.com/spreadsheets/d/1HZz7zkccEcBZQFS3zuOSjZV2YgjRkgld8c-QBfbowcc/edit#gid=634347005) for the list of Neocod accounts\\! \nAnd [click here](http://www.neopets.com/guilds/guild.phtml?id=4183432) to go to our very official guild\\!';

    return bot.sendMessage(msg.chat.id, text, {parseMode, webPreview});

});
//useful links
bot.on('/links', function (msg) {
	let parseMode = 'HTML';
	let webPreview = false;
	let text = 'Here are some handy links!\n\nNeopets pages: \n•<a href="http://www.neopets.com/stockmarket.phtml?type=portfolio">Stock Portfolio</a> \n•<a href="http://www.neopets.com/stockmarket.phtml?type=list&search=%&bargain=true">Bargain Stocks</a> \n•<a href="www.neopets.com/market.phtml?type=till">Your shop till</a> \n•<a href="http://www.neopets.com/~brownhownd">When will the Turmaculus wake up?</a> \n•<a href="http://www.neopets.com/neolodge.phtml">Neolodge</a> \n\nPages off of Neopets: \n•<a href="https://thedailyneopets.com/dailies">Dailies on TDN</a> \n•<a href="https://neofood.club/">NeoFoodClub</a> \n•<a href="http://lost.quiggle.org/">Lost and Pound</a> \n•<a href="http://www.jellyneo.net/?go=links">Games that don\'t need flash</a> \n•<a href="https://www.reddit.com/r/neopets/comments/n5k480/how_to_enable_flash_in_2021/">Enabling flash if you really wanna</a> \n•<a href="https://www.reddit.com/r/neopets/wiki/guides">Reddit guides</a> ';
    return bot.sendMessage(msg.chat.id, text, {parseMode, webPreview});
});
//userscripts
bot.on('/userscripts', function (msg) {
	let parseMode = 'HTML';
	let webPreview = false;
	let text = 'Here are some useful (and Neo-Legal!) userscripts! You\'ll probably need <a href="https://www.tampermonkey.net/">Tampermonkey</a> for these to work. \n\n•Improved Layouts: <a href="https://github.com/moonbathr/neopets">here</a> and <a href="https://github.com/neopets-fixes/neopets_code">here</a>. Just helps make things less ugly in beta neopets hell. \n•<a href="https://github.com/neopets-fixes/neopets_code">Better Navigation</a>: changes the easy-to-miss sidebar into a proper drop down. You can add your own links as bookmarks, too. \n•<a href="https://www.reddit.com/r/neopets/comments/ky3rf2/userscript_bring_back_the_maps/">Bring back the maps!</a>: Puts the maps back on the explore pages! \n•<a href="https://www.reddit.com/r/neopets/comments/29zu0a/userscript_search_helper_by_diceroll123/">Search Helper</a>: Adds icons to search that item on the shop wizard, jellyneo, your inventory, etc to just about every page. Amen. \n•<a href="https://github.com/Foxcapades/np-shop-highlight">Shop Highlight</a>: CHROME ONLY, but octobr has managed to get it working on firefox with some finagling! Highlights lists of items in any shop! Great for restocking. \n•<a href="https://github.com/jack0lantern/kadoatery-helper">Kadoatery Helper</a>: Keeps track of items you can use for the kadoatery in your inventory and SDB. \n•<a href="https://www.reddit.com/r/neopets/comments/kkf3cu/userscript_bank_improvements_for_beta_including/">Bank Improvements</a>: Interest calculator and automatically completes thousands/millions for the bank. \n•<a href="https://www.reddit.com/r/neopets/comments/l8yylc/userscript_grumpywise_king_autofill_avatar/">Grumpy and Wise King Autofillers</a>: Autofills the grumpy and wise king dropdowns if you\'re hunting for those avatars. \n•<a href="https://www.reddit.com/r/neopets/comments/hps1r4/shenkuu_lunar_temple_userscript_to_highlight_the/">Lunar Temple solver</a>: Highlights the correct answer for the Lunar Temple.'
	    return bot.sendMessage(msg.chat.id, text, {parseMode, webPreview});
});
//neopet image get
var petpic;
bot.on('inlineQuery', msg => {
    let query = msg.query;
    console.log(`inline query: ${ query }`);

    // Create a new answer list object
    const answers = bot.answerList(msg.id, {cacheTime: 60});
	petImage(`${ query }`).then(data => {
		console.log(data);
	}).catch(console.error);
	console.log(data.url);
    // Photo
    answers.addPhoto({
        id: 'photo',
        caption: `${ query }`,
        photo_url: 'https://telegram.org/img/t_logo.png',
        thumb_url: 'https://telegram.org/img/t_logo.png'
    });
    // Send answers
    return bot.answerQuery(answers);
});
//games list
var lastMessage;
bot.on('/games', msg => {
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('1', {callback: '/games1'}),
            bot.inlineButton('2', {callback: '/games2'}),
			bot.inlineButton('3', {callback: '/games3'}),
			bot.inlineButton('4', {callback: '/games4'})
        ]
		]);
		let parseMode = 'HTML';
		let webPreview = false;
		let text = 'Here are all the games that reward NP that still work without Flash. RIP Destructomatch. \n\n•<a href="http://www.neopets.com/games/game.phtml?game_id=1375">AAA\'s Revenge</a> \n•<a href="http://www.neopets.com/games/armada/armada.phtml">Armada</a> \n•<a href="http://www.neopets.com/games/cellblock/cellblock.phtml">Cellblock</a> \n•<a href="http://www.neopets.com/games/cheat/index.phtml">Cheat</a> \n•<a href="http://www.neopets.com/medieval/cheeseroller.phtml">Cheeseroller</a> \n•<a href="http://www.neopets.com/games/cliffhanger/cliffhanger.phtml">Cliffhanger</a> \n•<a href="http://www.neopets.com/games/dicearoo.phtml">Dice-A-Roo</a> \n•<a href="http://www.neopets.com/medieval/doubleornothing.phtml">Double or Nothing</a> \n•<a href="http://www.neopets.com/games/crossword/">Faerie Crossword</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1391">Fashion Fever</a> \n•<a href="http://www.neopets.com/games/maze/maze.phtml">Fetch</a>'
		return bot.sendMessage(msg.from.id, text, {parseMode, webPreview, replyMarkup}).then(re => {
			lastMessage = [msg.from.id, re.message_id];
		});
});
bot.on('/games1', msg => {
	const [chatId, messageId] = lastMessage;
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('1', {callback: '/games1'}),
            bot.inlineButton('2', {callback: '/games2'}),
			bot.inlineButton('3', {callback: '/games3'}),
			bot.inlineButton('4', {callback: '/games4'})
        ]
		]);
		let parseMode = 'HTML';
		let webPreview = false;
		let text = 'Here are all the games that reward NP that still work without Flash. RIP Destructomatch. \n\n•<a href="http://www.neopets.com/games/game.phtml?game_id=1375">AAA\'s Revenge</a> \n•<a href="http://www.neopets.com/games/armada/armada.phtml">Armada</a> \n•<a href="http://www.neopets.com/games/cellblock/cellblock.phtml">Cellblock</a> \n•<a href="http://www.neopets.com/games/cheat/index.phtml">Cheat</a> \n•<a href="http://www.neopets.com/medieval/cheeseroller.phtml">Cheeseroller</a> \n•<a href="http://www.neopets.com/games/cliffhanger/cliffhanger.phtml">Cliffhanger</a> \n•<a href="http://www.neopets.com/games/dicearoo.phtml">Dice-A-Roo</a> \n•<a href="http://www.neopets.com/medieval/doubleornothing.phtml">Double or Nothing</a> \n•<a href="http://www.neopets.com/games/crossword/">Faerie Crossword</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1391">Fashion Fever</a> \n•<a href="http://www.neopets.com/games/maze/maze.phtml">Fetch</a>'
		return bot.editMessageText({chatId, messageId}, text, {parseMode, webPreview, replyMarkup});
});
bot.on('/games2', msg => {
	const [chatId, messageId] = lastMessage;
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('1', {callback: '/games1'}),
            bot.inlineButton('2', {callback: '/games2'}),
			bot.inlineButton('3', {callback: '/games3'}),
			bot.inlineButton('4', {callback: '/games4'})
        ]
		]);
		let parseMode = 'HTML';
		let webPreview = false;
		let text = 'Here are all the games that reward NP that still work without Flash. RIP Destructomatch. \n\n•<a href="http://www.neopets.com/games/godori/index.phtml">Godori</a> \n•<a href="http://www.neopets.com/prehistoric/gogogo/index.phtml">Go! Go! Go!</a> \n•<a href="http://www.neopets.com/space/gormball.phtml">Gormball</a> \n•<a href="http://www.neopets.com/prehistoric/keno.phtml">Grarrl Keno</a> \n•<a href="http://www.neopets.com/games/psychoanalysis.phtml">Guess the Card</a> \n•<a href="http://www.neopets.com/medieval/guessmarrow.phtml">Guess the Weight of the Marrow</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1393">Hasee Bounce</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1390">Ice Cream Machine</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1389">Igloo Garage Sale Game</a> \n•<a href="http://www.neopets.com/games/blackjack.phtml">JubJub Bluff</a> \n•<a href="http://www.neopets.com/games/hidenseek.phtml">Kacheek Seek</a>'
		return bot.editMessageText({chatId, messageId}, text, {parseMode, webPreview, replyMarkup});
});
bot.on('/games3', msg => {
	const [chatId, messageId] = lastMessage;
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('1', {callback: '/games1'}),
            bot.inlineButton('2', {callback: '/games2'}),
			bot.inlineButton('3', {callback: '/games3'}),
			bot.inlineButton('4', {callback: '/games4'})
        ]
		]);
		let parseMode = 'HTML';
		let webPreview = false;
		let text = 'Here are all the games that reward NP that still work without Flash. RIP Destructomatch. \n\n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1310">Kass Basher</a> \n•<a href="http://www.neopets.com/medieval/kissthemortog.phtml">Kiss the Mortog</a> \n•<a href="http://www.neopets.com/pirates/krawp.phtml">Krawps</a> \n•<a href="http://www.neopets.com/games/neggsweeper/index.phtml">Neggsweeper</a> \n•<a href="http://www.neopets.com/games/neopoker.phtml">Neopoker</a> \n•<a href="http://www.neopets.com/games/nq2/index.phtml">Neoquest 2</a> \n•<a href="http://www.neopets.com/games/petpet_battle/index.phtml">Petpet Battles</a> \n•<a href="http://www.neopets.com/games/tycoon/index.phtml">Plushie Tycoon</a> \n•<a href="http://www.neopets.com/faerieland/poogleracing.phtml">Poogle Racing</a> \n•<a href="http://www.neopets.com/medieval/potatocounter.phtml">Potato Counter</a> \n•<a href="http://www.neopets.com/games/pyramids/index.phtml">Pyramids</a>'
		return bot.editMessageText({chatId, messageId}, text, {parseMode, webPreview, replyMarkup});
});
bot.on('/games4', msg => {
	const [chatId, messageId] = lastMessage;
    const replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('1', {callback: '/games1'}),
            bot.inlineButton('2', {callback: '/games2'}),
			bot.inlineButton('3', {callback: '/games3'}),
			bot.inlineButton('4', {callback: '/games4'})
        ]
		]);
		let parseMode = 'HTML';
		let webPreview = false;
		let text = 'Here are all the games that reward NP that still work without Flash. RIP Destructomatch. \n\n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1388">Rink Runner</a> \n•<a href="http://www.neopets.com/games/draw_poker/round_table_poker.phtml">Round Table Poker</a> \n•<a href="http://www.neopets.com/games/sakhmet_solitaire/index.phtml">Sakhmet Solitaire</a> \n•<a href="http://www.neopets.com/games/scarab21/index.phtml">Scarab 21</a> \n•<a href="http://www.neopets.com/games/slots.phtml">Scorchy Slots</a> \n•<a href="http://www.neopets.com/games/sewage/index.phtml">Sewage Surfer</a> \n•<a href="http://www.neopets.com/medieval/shapeshifter_index.phtml">Shapeshifter</a> \n•<a href="http://www.neopets.com/games/snowwars.phtml">Snow Wars</a> \n•<a href="http://www.neopets.com/games/h5game.phtml?game_id=1392">Turmac Roll</a> \n•<a href="http://www.neopets.com/games/tyranuevavu.phtml">Tyranu Evavu</a>'
		return bot.editMessageText({chatId, messageId}, text, {parseMode, webPreview, replyMarkup});
});
//commands list
bot.on('/commands', function (msg) {
	let text = 'I\'m Neoptes the Neopets bot! Here\'s some stuff I can do!\n\n/info For information about Neocod!\n/neohelp For help playing Neopets!\n/links For useful pages on and off the site!\n/userscripts For a list of cool plugins that make things easier!\n/games For a list of games that don\'t need flash to work!\n\nI\'ll also remind everyone when the Snowager is sleeping and when you can play Deadly Dice!'
	return bot.sendMessage(msg.chat.id, text);
});
//schedule messages
var chatid;
bot.on('/start', function (msg) {
	chatid=msg.chat.id;
	return bot.sendMessage(chatid, 'Welcome to Neocod! I\'m a bot\! Try /commands!');
});
const snowy = new schedule.RecurrenceRule();
snowy.tz = 'America/Los_Angeles';
snowy.hour = [6, 14, 22];
snowy.minute = 0;
snowy.second = 15;
const snowager = schedule.scheduleJob(snowy,function() {
	let parseMode='HTML';
	let webPreview = false;
	let text = 'The Snowager is asleep! <a href="http://www.neopets.com/winter/snowager.phtml">Click here!</a>'
	bot.sendMessage(chatid, text, {parseMode, webPreview});
});
const deadly = new schedule.RecurrenceRule();
deadly.tz = 'America/Los_Angeles';
deadly.hour = 0;
deadly.minute = 0;
deadly.second = 15;
const dice = schedule.scheduleJob(deadly,function() {
	let parseMode='HTML';
	let webPreview = false;
	let notification = false;
	let text = 'Time for Deadly Dice! <a href="www.neopets.com/worlds/deadlydice.phtml">Click here!</a>'
	bot.sendMessage(chatid, text, {parseMode, notification, webPreview});
});
bot.start();