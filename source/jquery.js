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

    $("#add_img img").click(() => {
        $("#note_form").fadeIn().addClass("popup");
        change_position($(".popup"));
    });

    $("#add_note").click(() => {
        $("#note_form").fadeOut(() => {$(this).removeClass("popup")});
        $("#note").append(`${$("#note_title").val()}<br/>${$("#note_date").val()}<br/>${$("#note_content").val()}<br/><br/>`);
    });

    $(window).resize(() => {
        change_position($(".popup"));
    });

    $("#moving_button").click(() => {
        const width = $("#moving_box").css("width");
        if (parseInt(width) + 50 >= parseInt($("#animation_test").css("width"))) return;
        $("#moving_box").animate({"right": 0, 
            "width": "+=50px", 
            "height": "+=50px"});
        $("#animation_test").css({"height": "+=50px"})
    });

    $(".accordion").each(function() {
        const dds = $(this).find("dd");
        const dts = $(this).find("dt");
        function closeAll() {
            dds.addClass("closed");
            dts.addClass("closed");
        }
        function open(dt, dd) {
            dt.removeClass("closed");
            dd.removeClass("closed");
        }
        closeAll();
        dts.click((e) => {
            closeAll();
            open($(e.target), $(e.target).next());
        });
    })

    $('.slideshow').each(function() {
        const container = $(this);
        let timer;
        function switchImg() {
            const imgs = container.find("img");
            const first = imgs.eq(0);
            const second = imgs.eq(1);
            first.appendTo(container).fadeOut(2000);
            second.fadeIn();
        }
        function startTimer() {
            timer = setInterval(switchImg, 3000);
        }
        function stopTimer() {
            clearInterval(timer);
        }
        container.hover(stopTimer, startTimer);
        startTimer();
    });

    $("#getText1").on("click", () => {
        $("#textbox").text("글자 입력 테스트");
        const req = $.ajax("data.json");
        req.done((data, status) => {
            // JSON.parse(data).forEach((d) => $("#textbox").append('<br/>' + d.name));
            data.forEach((d) => $("#textbox").append('<br/>' + d.name));
        })
    });

    $("#getText2").on("click", () => {
        const tb = $("<table />");
        tb.append($("<tr />").append(
            $("<th />").text("이름"),
            $("<th />").text("아이디"),
            $("<th />").text("학과"),
            $("<th />").text("수강과목"),
        ))
        const req = $.get("data.json", (data, status) => {
            data.forEach((d, i) => {
                const row = $("<tr />").append(
                    $("<td />").text(d.name),
                    $("<td />").text(d.id),
                    $("<td />").text(d.department),
                    $("<td />").text(d.class.join(", ")),
                );
                tb.append(row);
            });
        });
        $("#textbox").html(tb);
    })
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

function change_position(obj) {
    let left = ($(window).width() - obj.width())/2;
    let top = ($(window).height() - obj.height())/2;
    obj.css({"top": top, "left": left});
}

