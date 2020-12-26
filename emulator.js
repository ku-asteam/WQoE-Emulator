let emulator = (function(){
    let belowTheFoldMask = null;
    let page_bgimgs = [];
    let page_texts = [];
    let page_imgs = [];
    let page_heads = [];
    let page_iframes = [];

    let results = [];
    
    function init(options) {
        results = [];
        document.body.style.display = "none";

        belowTheFoldMask = document.getElementById("below-the-fold-mask");
        belowTheFoldMask.style.display = "";

        [...document.body.querySelectorAll("*")].forEach(e => {
            if (e.tagName in ["iframe", "h1", "h2", "h3", "h4", "h5", "h6", "script"]) {
                //
            } else if (window.getComputedStyle(e, null).getPropertyValue('background-image') != "none") {
                page_bgimgs.push(e);
            } else if (e.nodeType == 1 && (e.innerText != undefined && e.innerText != "")) {
                page_texts.push(e);
            }
        });

        page_imgs = [
            ...document.body.getElementsByTagName("img"),
            ...document.body.getElementsByTagName("svg"),
            ...document.body.getElementsByTagName("video")
        ];

        page_heads = [...document.body.getElementsByTagName("h1"),
            ...document.body.getElementsByTagName("h2"),
            ...document.body.getElementsByTagName("h3"),
            ...document.body.getElementsByTagName("h4"),
            ...document.body.getElementsByTagName("h5"),
            ...document.body.getElementsByTagName("h6")
        ];

        page_iframes = [...document.body.getElementsByTagName("iframe")];


        // goHidden
        page_bgimgs.forEach(e => {
            e.style.visibility = 'hidden';
        });

        page_imgs.forEach(e => {
            e.style.visibility = 'hidden';
        });

        page_texts.forEach(e => {
            e.style.color = 'rgba(0, 0, 0, 0)';
        });

        page_heads.forEach(e => {
            e.style.color = 'rgba(0, 0, 0, 0)';
        });

        page_iframes.forEach(e => {
            e.style.visibility = 'hidden';
        });
    }

    function doFirstPaint() {
        document.body.style.display = '';
        let thisTime = performance.now() - timeBase;
        results.push({
            func: "updateEmulationTime",
            name: "doFirstPaint",
            time: thisTime
        });
    }

    function showHeads() {
        page_heads.forEach(e => {
            e.style.color = '';
        });
        let thisTime = performance.now() - timeBase;
        results.push({
            func: "updateEmulationTime",
            name: "showHeads",
            time: thisTime
        });
    }

    function showTexts() {
        page_texts.forEach(e => {
            e.style.color = '';
        });
        let thisTime = performance.now() - timeBase;
        results.push({
            func: "updateEmulationTime",
            name: "showTexts",
            time: thisTime
        });
    }

    function showImages() {
        page_imgs.forEach(e => {
            e.style.visibility = '';
        });

        page_bgimgs.forEach(e => {
            e.style.visibility = 'visible';
        });

        let thisTime = performance.now() - timeBase;

        results.push({
            func: "updateEmulationTime",
            name: "showImages",
            time: thisTime
        });
    }

    function showAds() {
        page_iframes.forEach(e => {
            e.style.visibility = '';
        });
        let thisTime = performance.now() - timeBase;

        results.push({
            func: "updateEmulationTime",
            name: "showAds",
            time: thisTime
        });
    }

    function showBelowTheFold() {
        belowTheFoldMask.style.display = "none";
        let thisTime = performance.now() - timeBase;
        results.push({
            func: "updateEmulationTime",
            name: "showBelowTheFold",
            time: thisTime
        });
    }

    function getResults() {
        console.log("Emulation result is ...". results);
        return results;
    }

    function doEmulation(setting) {
        setTimeout(doFirstPaint, setting.layout * 1000);
        setTimeout(showHeads, setting.head * 1000);
        setTimeout(showTexts, setting.text * 1000);
        setTimeout(showImages, setting.image * 1000);
        setTimeout(showAds, setting.ad * 1000);
        setTimeout(showBelowTheFold, setting.btf * 1000);
    }

    return {
        init: init,
        doEmulation: doEmulation,
        getResults: getResults
    }
});