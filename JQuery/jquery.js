let i = 0;
let imgCounter = 0;
const imgArray = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"];

$(document).ready(() => {
    $("div.out").mouseover(() => {
        $("div.out p:first-child").text("mouse over");
        $("div.out p:nth-child(2)").text(i);
        i++;
    }).mouseout(() => {
        $("div.out p:first-child").text("mouse out");
    })

    $("#b1").on("click",
        {
            url: "https://www.google.com",
            winattributes: "resize=1, scrollbars=1, status=1"
        },
        max_open
    );

    $("#bind").click(() => {
        $("body").on("click", "#theone", flash)
            .find("#theone")
            .text("Can Click!");
    });

    $("#unbind").click(() => {
        $("body").off("click", "#theone", flash)
            .find("#theone")
            .text("Does Nothing...");
    });

    $("#trigger_test button:first").click(() => update($("#trigger_test span:first")));
    $("#trigger_test button:last").click(() => {
        $("#trigger_test button:first").trigger("click");
        update($("#trigger_test span:last"));
    });

    $("#image").click((e) => {
        const newSrc = $(e.target).attr("src") === "img1.png" ? "img2.png" : "img1.png";
        $(e.target).attr("src", newSrc);
    });

    $("#imgAlbum")
        .attr("src", imgArray[imgCounter])
        .click(() => {
        imgCounter = (imgCounter + 1) % imgArray.length;
        $("#imgAlbum").attr("src", imgArray[imgCounter]);
    });
})

function update(j) {
    let n = parseInt(j.text(), 10);
    j.text(n + 1);
}

function flash() {
    $("#off_test").show().fadeOut("slow");
}

function max_open(event) {
    const maxwindow = window.open(event.data.url, "", event.data.winattributes);
    maxwindow.moveTo(0, 0);
    maxwindow.resizeTo(screen.availWidth, screen.availHeight);
}