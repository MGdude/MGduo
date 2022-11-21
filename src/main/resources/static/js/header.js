const test = document.querySelector(".content-login");

test.onclick = () => {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/principal",
        dataType: "json",
        success: (response) => {
            console.log(response.data);
        },
        error: (error) => {
            console.log(error);
        }
    });

}
