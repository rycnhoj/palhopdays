var pages = ['home', 'about', 'bands', 'videos', 'shop', 'contact']
var bandVideos = {
  'MD': '0AHibdNSVk8',
  'TTT': 'RTk5-BSh8ag',
  'RK': 'dFd5yPSsXV0',
  'TI': '1bfX53tC6b8',
  'TRR': 'Q_89WxaCANo',
  'TT': 'iZmjZpVomaU',
  'BE': 'xMlTqVBFmwM'
}
var bandTitles = {
  'MD': 'The Moon Dawgs',
  'TTT': 'Terry and The Telstars',
  'RK': 'The Royal Knights',
  'TI': 'The Innkeepers',
  'TRR': 'The Rockin\' Recons',
  'TT': 'The Travelers',
  'BE': 'Bob Elie'
}
var firstVideo = 'sixty'
var aboutData, bandsData

$('.body').hide()
$('.center').hide()
$('.about-social-links').hide()
$('.band-video').hide()
$('.body').fadeIn(3000, "swing")


var homeVideoPlayer, bandVideoPlayer, posterVideoPlayer, musicVideoPlayer

function onYouTubeIframeAPIReady() {
  var vars = {
    'autoplay': 0,
    'controls': 1,
    'enablejsapi': 1,
    'modestbranding': 1,
    'rel': 0,
    'showinfo': 0
  }

  homeVideoPlayer = new YT.Player('homeVideo', {
    videoId: 'PO3cKEZ7UcE',
    playerVars: vars,
    events: { 'onReady': homeVideoPlayerReady }
  })

  bandVideoPlayer = new YT.Player('bandVideo', {
    playerVars: vars,
    events: { 'onReady': bandVideoPlayerReady }
  })

  posterVideoPlayer = new YT.Player('posterVideo', {
    videoId: 'SWYucDQ9uNY',
    playerVars: vars,
    events: { 'onReady': posterVideoPlayerReady }
  })

  musicVideoPlayer = new YT.Player('musicVideo', {
    videoId: '8i5v5ZxtTXA',
    playerVars: vars,
    events: { 'onReady': musicVideoPlayerReady }
  })
}

// Player Ready Control
var homeReady, bandReady, posterReady, videosReady

function homeVideoPlayerReady() {
  homeReady = true
  onPlayerReady()
}

function bandVideoPlayerReady() {
  bandReady = true
  onPlayerReady()
}

function posterVideoPlayerReady() {
  posterReady = true
  onPlayerReady()
}

function musicVideoPlayerReady() {
  videosReady = true
  onPlayerReady()
}

function onPlayerReady() {
  if (homeReady && bandReady && posterReady && videosReady) {
    // Check Url and Load Page
    checkUrlForPage()

    // Get Band Description Data
    $.getJSON('./data/bands.json', function (resp) { bandsData = resp })

    // Once Loaded Show The Website
    $('.about-social-links').fadeIn(1000, "swing")
    $('.center').fadeIn(1000, "swing")
  }
}

// Handle page nav
function checkUrlForPage() {
  var pageNav = window.location.hash.substr(1)
  if (pageNav) {
    changePage(pageNav)
  } else {
    changePage('home')
  }
}

// Changing pages
function changePage(mode) {
  pages.forEach(function (page) {
    if (page !== 'home') { homeVideoPlayer.stopVideo() }
    if (page !== 'bands') { bandVideoPlayer.stopVideo() }
    if (page !== 'shop') { posterVideoPlayer.stopVideo() }
    if (page !== 'videos') { musicVideoPlayer.stopVideo() }

    if (page === 'videos') {
      changeMusicVideo(firstVideo, true)
      musicVideoPlayer.stopVideo()
    } else if (page === 'bands') {
      $('.band-select').show()
      $('.band-video').hide()
    }

    if (page === mode) {
      window.history.pushState(mode, 'Title', '#' + mode) // Update Url
      $('.nav-' + page).addClass('text-underline')
      $('.' + page).show()
    } else {
      $('.nav-' + page).removeClass('text-underline')
      $('.' + page).hide()
    }
  })
}

var musicVideos = {
  'sixty': '8i5v5ZxtTXA',
  'reasons': 'y2M-QWxciBY',
  'la': 'hAVxtM2wsI0'
}

function changeMusicVideo(videoId, first) {
  musicVideoPlayer.loadVideoById({ 'videoId': musicVideos[videoId] })
  musicVideoPlayer.stopVideo()

  updateSelectedVideo(videoId)
}

function updateSelectedVideo(videoId) {
  var musicVideoList = $('.music-videos').toArray()

  musicVideoList.forEach(function (video) {
    if (video.id === videoId) {
      $(video).addClass('active')
    } else {
      $(video).removeClass('active')
    }
  })
}

// Changing band videos
function changeBandVideo(bandId, first) {
  var poster = $('.band-poster').hide()
  var description = $('.band-description').empty()
  var videoId = bandVideos[bandId]
  var paragraphs = bandsData[bandId]

  poster.attr('src', './images/posters/' + bandId + '.jpg').fadeIn(1000, "swing")
  bandVideoPlayer.loadVideoById({ 'videoId': videoId })
  bandVideoPlayer.stopVideo()
  paragraphs.forEach(function (paragrpah) {
    description.append('<p class="band">' + paragrpah + '</p>')
  })

  $('.band-select').hide()
  $('.band-video').show()
}
