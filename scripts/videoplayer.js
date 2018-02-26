(function(){

	var currentVidIndex = 0;
	var currentVidArray = [];
	var overlayon = false;
	function playVideo(array, index){
		currentVidArray = array;
		currentVidIndex = index;
		if(currentVidIndex == 0) dotcss("#video-browser-lt").hide();
		else dotcss("#video-browser-lt").show().display("table");
		if(currentVidIndex == currentVidArray.length - 1) dotcss("#video-browser-gt").hide();
		else dotcss("#video-browser-gt").show().display("table");
		$("#video-player")[0].src = "https://www.youtube.com/embed/" + array[index] ;//+ "?autoplay=1";
		if(!overlayon) dotcss("#absolute-video-player-container").fadeIn();
		overlayon = true;
	}
	function stopVideo(){
		//console.log("closing");
		currentVidArray = 0;
		dotcss("#absolute-video-player-container").fadeOut(function(){
			$("#video-player")[0].src = "";
		});
		overlayon = false;
	}
	function prevVid(e){if(e) e.stopPropagation(); currentVidIndex = Math.max(0, currentVidIndex - 1); playVideo(currentVidArray, currentVidIndex);}
	function nextVid(e){if(e) e.stopPropagation(); currentVidIndex = Math.min(currentVidArray.length - 1, currentVidIndex + 1); playVideo(currentVidArray, currentVidIndex);}

	dot.createWidget("videolist", function(videoIds, numbPerRow){
		numbPerRow = numbPerRow || 3;
		var vidGrid = [];
		var vidRow = [];
		for(var i = 0; i < videoIds.length; i++){
			vidRow.push(videoIds[i]);
			if((i+1) % numbPerRow == 0) {
				vidGrid.push(vidRow); 
				vidRow = [];
			}
		}
		//This is a buffer to add to the bottom of the grid
		//so that the page doesn't appear ugly on large screens.
		if(vidRow != []) vidGrid.push(vidRow);
		return dot.each(vidGrid, function(row){
			return dot.div(
				dot.each(row, function(element){
					return dot.div(
						dot.img().src("https://img.youtube.com/vi/" + element + "/0.jpg").style(dotcss.widthP(100).cursor("pointer"))
						.onclick(function(){
							playVideo(videoIds, videoIds.indexOf(element));
						})
					).style(dotcss.widthP(100 / numbPerRow).display("inline-block"));
				})
			).style("width: 100%;");
		});
	});

	dotcss(".video-browser{}")
		.display("table")
		.heightP(100)
		.position("absolute")
		.zIndex(2);

	dotcss(".video-browser>span{}")
		.display("table-cell")
		.verticalAlign("middle")
		.fontSize(400)
		.lineHeight(400)
		.color("#666666")
		.fontFamily("Impact, Charcoal, sans-serif")
		.userSelect("none");

	dotcss(".video-browser:hover{}")
		.backgroundColor(255,255,255,0.1)

	setTimeout(function(){
		dot("body").div(
			//TODO: just changed width and height from dot.iframe.width(420).height(315)
			dot
			.div(dot.span("<")).id("video-browser-lt").class("video-browser").style(dotcss.left(0)).onclick(prevVid)
			.div(dot.span(">")).id("video-browser-gt").class("video-browser").style(dotcss.right(0)).onclick(nextVid)
			.iframe().id("video-player").attr("allowfullscreen").style(dotcss.heightP(50).widthP(50).marginTopP(12.5).marginLeftP(25))
		).id("absolute-video-player-container").onclick(stopVideo).style(
			dotcss.display("none")
			.position("fixed")
			.top(0).bottom(0).left(0).right(0)
			.verticalAlign("top")
			.textAlign("left")
			.backgroundColor(0,0,0,0.7)
			.cursor("pointer")
			.zIndex(1)
		);
	}, 0);
})();