//v0.1

(function(){

	function selectText(containerid) {
		if (document.selection) {
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select();
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
	}

	dotcss(".donate-btn{}")
		.opacity(0.6)
		.backgroundRepeat("no-repeat")
		.border("2px solid rgba(0,0,0,0)");
	dotcss(".donate-btn:hover{}")
		.opacity(1)
		.border("2px solid rgba(127,255,127,1)");

	dot.createWidget("supportbtn", function(title, icon, url, coinAddress){
		return dot.button().class("donate-btn").title(title).style(dotcss.display("inline-block").width(48).height(48).cursor("pointer").backgroundImage(icon).backgroundSize("contain")).onclick(function(){
			if(url){
				window.open(url, "_blank");
			}
			else{
				dot("#donate-coinimg").empty().img().src(icon)
				dot("#donate-cointype").empty().h(title)
				dot("#donate-cointype2").empty().h(title)
				dot("#donate-coinaddr").empty().h(coinAddress)
				dotcss("#donate-cryptodonate").fadeIn();
			}
		})
	});

	dot.createWidget("allsupportbuttons", function(customHeader, customCryptoCaption){
		return dot.div(
			dot.div(
				dot.div(customHeader || "Support this app and others like it!")
				.supportbtn("Patreon", "http://jsideris.com/supporticons/patreon.png", "https://patreon.com/jsideris", customCryptoCaption)
				.supportbtn("Bitcoin", "http://jsideris.com/supporticons/bitcoin.png", null, "182tfHxo1Y3bpDqijCy57LiEDheWjbtRS8", customCryptoCaption)
				.supportbtn("Bitcoin Cash", "http://jsideris.com/supporticons/bitcoincash.png", null, "15YMbexTPHaT9uv3Bgd1nCdckvFkDYWhU5", customCryptoCaption)
				.supportbtn("Etherium", "http://jsideris.com/supporticons/ethereum.png", null, "0x084f86eef4e12193c037300b1d79e9afa85525f9", customCryptoCaption)
				.supportbtn("Litecoin", "http://jsideris.com/supporticons/litecoin.png", null, "La1ar7NoPNQBy6MBoC4yT5miJnnSUajc35", customCryptoCaption)
			).style(dotcss.display("inline"))
		).style(dotcss.widthP(100).textAlign("center"))
		.div(
			dot.div(
				dot.span().id("donate-cointype").style(dotcss.fontWeight("bold"))
				.div().id("donate-coinimg")
				.div().style(dotcss.marginTop(10).marginBottom(10).widthP(100).height(4).borderRadius(2).backgroundColor(200, 50, 170))
				.span().id("donate-message")
				.span("Use the following address to send ").span().id("donate-cointype2").br()
				.span("Thanks for your contribution!")
				.br().br()
				.div().id("donate-coinaddr").style(dotcss.paddingLeft(10).overflow("hidden").textOverflow("ellipsis").border("1px solid black").fontSize(16).lineHeight(36).cursor("pointer")).onclick(function(){selectText('donate-coinaddr');})
				.div().style(dotcss.marginTop(10).marginBottom(10).widthP(100).height(4).borderRadius(2).backgroundColor(200, 50, 170))
			).style(dotcss.position("absolute").overflowY("auto").leftP(12.5).topP(12.5).widthP(75).heightP(75).backgroundColor("white").borderRadius(5).padding(20).fontSize(36)).onclick(function(e){event.stopPropagation();})
		).id("donate-cryptodonate").style(dotcss.position("fixed").display("none").top(0).bottom(0).left(0).right(0).backgroundColor(0,0,0,0.5)).onclick(function(){
			dotcss("#donate-cryptodonate").fadeOut();
		})
	});

})();