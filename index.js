var peer = new Peer({key: 'sfs7touq9uo6flxr',
					debug: 3,
					config: {'iceServers': [
											{url: 'stun:stun.l.google.com:19302'},
											{url: 'stun:stun1.l.google.com:19302'}
											]}
										});

AdapterJS.webRTCReady(function() {
    getUserMedia({
    				audio: true,
    				video: true
    			},
    			function(stream) {
         			var video = document.getElementById('me');
         			window.localStream = stream;
         			attachMediaStream(video, stream);
         			video.play();
    			 }, function (error) {
						console.log('Failed getting stream', error);
				});
});

peer.on('open', function(){
	$('#myId').text(peer.id);
})

peer.on('call', function(call){
	call.answer(window.localStream);
	call.on('stream', function(stream){
		var video = document.getElementById('friend');
		attachMediaStream(video, stream);
	})
})

var lolShout = new Backbone.Marionette.Application();

lolShout.addRegions({
    playersRegion: "#playersRegion"
});

var Player = Backbone.Model.extend({
    defaults: {
        ID: null,
        PlayerName: null
    }
});

var PlayersCollection = Backbone.Collection.extend({
    model: Player
});

var PlayerView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#playerView",
    
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },
 
    events: {
        'click #btnMutePlayer': "mutePlayer",
        'click #btnKickPlayer': "kickPlayer"
    },
 
    mutePlayer: function() {
        // do something to mute player
    },
 
    kickPlayer: function() {
        // do something to kick player
    }
});

var PlayersCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: PlayerView,
    tagName: 'table',
});

var PlayersController = Backbone.Marionette.Controller.extend({
    ShowPlayersList: function (options) {
        //this.collection = new PlayersCollection();
        var player1 = new Player({playerName: "player1"});
        var player2 = new Player({playerName: "test2"});
		var players = new PlayerView({model: Player});
		var coll = new PlayersCollection();
		coll.add(player1);
		coll.add(player2);
		var playersView = new PlayersCollectionView({ collection: coll });
        options.region.show(playersView);
    }
});

var playersController = new PlayersController();
playersController.ShowPlayersList({ region: lolShout.playersRegion });
