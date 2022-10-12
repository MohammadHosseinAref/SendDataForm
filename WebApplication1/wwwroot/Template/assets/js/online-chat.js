$(document).ready(function () {
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.start().then(function () {
        // document.getElementById("sendButton").disabled = false;
      //  alert('start')
    }).catch(function (err) {
        return console.error(err.toString());
    });
        //
  $("#start-chat-btn").click(function () {
    $(".chat-panel")
      .children(".chat-panel__chatbox")
      .each(function (i) {
        if ($(this).is(":hidden")) {
          clearContacts($(this).attr("id"));
          clearMessages($(this).attr("id"));
          getContacts($(this).attr("id"));
          $(this).show();
          $("#start-chat-btn").addClass("hide");
          return false;
        }
      });
  });

  $(".chat-panel").on("click", ".minimize-chat-btn", function (event) {
    event.preventDefault();
    let chatpanel = $(this).parent().closest(".chat-panel__chatbox");
    if (chatpanel.hasClass("minimize")) {
      chatpanel.children(".card").find(".card-chat").show();
      chatpanel.removeClass("minimize");
    } else {
      chatpanel.children(".card").find(".card-chat").hide();
      chatpanel.addClass("minimize");
    }
  });

  $(".chat-panel").on("click", ".close-chat-btn", function (event) {
    event.preventDefault();
    $(this).parent().closest(".chat-panel__chatbox").hide();
    $("#start-chat-btn").removeClass("hide");
  });

  ///// CONTACT CLICKED
  $(".chat-panel").on("click", ".chatbox-contact", function (event) {
    event.preventDefault();
    let chatpanelId = $(this)
      .parent()
      .closest(".chat-panel__chatbox")
      .attr("id");
      let contactId = $(this).attr("attr-cid");
      let contactName = $(this).attr("attr-cname");

      changeChatPanelName("chat-panel-" + chatpanelId.slice(-1), contactName, contactId);
    ///// CALL TO LOAD MESSAGES
    getMessage("chat-panel-" + chatpanelId.slice(-1), contactId);

    $("#chat-panel-" + chatpanelId.slice(-1))
      .find(".chatbox-contacts__list")
      .children(".chatbox-contact")
      .each(function () {
        $(this).removeClass("active");
      });
    $("#chat-tab-" + chatpanelId.slice(-1)).tab("show");
    $(this).addClass("active");
  });

  ///// CONTACT INPUT KEYPRESS
  $(".chat-panel").on("keypress", ".search-contact-inp", function (event) {
    let searchInputId = $(this).attr("id");
      let contactName = $(this).val();


      var RecipientToSearch = contactName
      if (RecipientToSearch.length > 2) {

          jQuery.post('Chat/SearchRecipient', { RecipientToSearch: RecipientToSearch }, function (value) {

              fillContacts("chat-panel-" + searchInputId.slice(-1), JSON.parse(value));
              /////$('#FoundRecipients').append(value)
          })
      }

  });

  ///// MESSAGE FORM SUBMITED
  $(".chat-panel").on("submit", ".frm-message-send", function (event) {
    event.preventDefault();
    let chatpanelId = $(this).attr("id");
      let messageSender = $(this).find("#SenderId").val();
      let messageText = $(this).find("#SenderMessage").val();
      sendMessage(messageText, messageSender, "chat-panel-" + chatpanelId.slice(-1));
      $(this).find("#SenderMessage").val("");


  });

  //function addMessage(messageText, messageType, messageAuthor, chatbox) {
  //  if (messageAuthor == "") {
  //    $("#" + chatbox).find(".chatbox-messages").append(`
  //    <div class="chatbox-message ${messageType}">
  //      <p>${messageText}</p>
  //    </div>
  //    `);
  //  } else {
  //    $("#" + chatbox).find(".chatbox-messages").append(`
  //    <div class="chatbox-message ${messageType}">
  //      <div class="author">${messageAuthor}</div>
  //      <p>${messageText}</p>
  //    </div>
  //    `);
  //  }
  //}
    function sendMessage(messageText, messageSender, chatbox) {
        let contactId = $("#" + chatbox).attr("attr-cId")
        console.log(messageText, messageSender );
    //// AJAX SEND MESSAGE 

        connection.invoke("SendPrivateMessage", messageSender, contactId, messageText).catch()

    //$("#" + chatbox).find(".chatbox-messages").append(`
    //  <div class="chatbox-message from-me">
    //    <p>${messageText}</p>
    //  </div>
    //  `);
    }

    connection.on("PrivateMessageSent", function (Recipient, Msg) {
       // alert(Msg);
        //$("[attr-cId=" + Recipient+"]").find(".chatbox-messages").append(`
        $("#chat-panel-1").find(".chatbox-messages").append(`
      <div class="chatbox-message from-them">
        <p>${Msg}</p>
      </div>
      `);

    })
  function getMessage(chatbox, contact) {
    

    ///// AJX GET MESSAGES
    let chatMessages = [
      //{
      //  author: "بهروز",
      //  messageText:
      //    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد",
      //  messageType: "from-them",
      //},
      //{
      //  author: "",
      //  messageText:
      //    "نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای",
      //  messageType: "from-me",
      //},
      //{
      //  author: "",
      //  messageText:
      //    "علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود",
      //  messageType: "from-them",
      //},
      //{
      //  author: "",
      //  messageText:
      //    "دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد",
      //  messageType: "from-me",
      //},
      //{
      //  author: "",
      //  messageText:
      //    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد",
      //  messageType: "from-me",
      //},
    ];

    chatMessages.forEach((element) => {
      if (element.author == "") {
        $("#" + chatbox).find(".chatbox-messages").append(`
        <div class="chatbox-message ${element.messageType}">
          <p>${element.messageText}</p>
        </div>
        `);
      } else {
        $("#" + chatbox).find(".chatbox-messages").append(`
        <div class="chatbox-message ${element.messageType}">
          <div class="author">${element.author}</div>
          <p>${element.messageText}</p>
        </div>
        `);
      }
    });
  }
  function clearMessages(chatbox) {
    $("#" + chatbox)
      .find(".chatbox-messages")
      .empty();
    console.log("clear messages on", chatbox);
  }

  function getContacts(chatbox) {
    ///// AJX GET CONTACTS

    let chatContacts = [
      //{
      //  id: "1",
      //  name: "بهروز",
      //  role: "کاربر",
      //  img: "assets/images/users/behrooz.jpg",
      //},
      //{
      //  id: "2",
      //  name: "حامد",
      //  role: "داور",
      //  img: "assets/images/users/hamed.jpg",
      //},
      //{
      //  id: "3",
      //  name: "پژمان",
      //  role: "پشتیبان سایت",
      //  img: "assets/images/users/pejman.jpg",
      //},
    ];

    chatContacts.forEach((element) => {
      $("#" + chatbox).find(".chatbox-contacts__list").append(`
      <div class="chatbox-contact" id="contact-id-${element.id}" attr-cid="${element.Id}"  attr-cname="${element.Name}">
        <div class="chatbox-contact--img">
          <img src="${element.img}" class="img-fluid">
        </div>
        <div class="chatbox-contact--info">
          <div class="chatbox-contact--name">${element.name}</div>
          <div class="chatbox-contact--lsmessage">${element.role}</div>
        </div>
      </div>
      `);
    });

    console.log("get contacts for", chatbox);
    }

    function fillContacts(chatbox, chatContacts) {
        
        ///// AJX GET CONTACTS
        clearContacts(chatbox);
        chatContacts.forEach((element) => {
            $("#" + chatbox).find(".chatbox-contacts__list").append(`
      <div class="chatbox-contact" id="contact-id-${element.Id}" attr-cid="${element.Id}" attr-cname="${element.Name}">
        <div class="chatbox-contact--img">
          <img src="data:image/jpeg;base64,${element.ProfileImage}" class="img-fluid">
        </div>
        <div class="chatbox-contact--info">
          <div class="chatbox-contact--name">${element.Name}</div>
          <div class="chatbox-contact--lsmessage">${element.AssertedSpeciality}</div>
        </div>
      </div>
      `);
        });

        console.log("get contacts for", chatbox);
    }
  function clearContacts(chatbox) {
    $("#" + chatbox)
      .find(".chatbox-contacts__list")
      .empty();
    console.log("clear contacts on", chatbox);
  }

  function changeChatPanelName(chatbox, name,userId) {
    $("#" + chatbox)
      .find(".card-header span")
          .text("گفتگو با " + name);
    $("#" + chatbox).attr('attr-cId', userId)
   
  }
});
