let i = 0;
$(document).ready(() => {
    $("div.out").mouseover(() => {
        $("div.out p:first-child").text("mouse over");
        $("div.out p:nth-child(2)").text(i);
        i++;
    }).mouseout(() => {
        $("div.out p:first-child").text("mouse out");
    })

})