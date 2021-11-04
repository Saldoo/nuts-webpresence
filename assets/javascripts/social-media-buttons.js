window.addEventListener('load', function() {

  function bindSocialClick(selector, url) {
    var element = document.querySelector(selector);
    if (!element) {return;}

    element.addEventListener('click', function() {
      var left = (screen.width - 570) / 2;
      var top = (screen.height - 570) / 2;
      var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
      window.open(url,"NewWindow",params);
    });
  }

  var pageUrl = encodeURIComponent(document.URL);

  bindSocialClick('.social-media-buttons .facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl);
  bindSocialClick('.social-media-buttons .twitter',  'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + encodeURIComponent('Wat een goed idee! #nuts'));
  bindSocialClick('.social-media-buttons .linkedin', 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageUrl);
});
