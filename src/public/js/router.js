let currentURL = "";
let previousURL = "";

$(document).ready(() => {
  setInterval(() => {
    currentURL = document.location.href;

    if (currentURL != previousURL) {
      previousURL = currentURL;
      let string = window.location.pathname.toLowerCase();
      string = string.substring(1).split("/");
      $.get(`/${string[0]}/render/${string[1]}`)
        .fail(() => {})
        .done((res) => {
          $(".pageContent").html(res);
        });
    }

    previousURL = currentURL;
  }, 50);
});

$(document).ready(() => {
  console.log("hi1")
  $(document).on("click", "a[target='router']", (e) => {
    if ($(this).attr("href") === "javaScript:void();") return;
  
    console.log(wagwan)
    currentURL = "";
    previousURL = "";
    e.preventDefault();
    console.log($(this).attr("href"));
    window.history.pushState("data", "Tide Radio", $(this).attr("href"));
  });
})