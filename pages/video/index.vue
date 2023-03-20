<template>
    <div class="video_player">
        <video id="video" class="video-js vjs-default-skin"></video>
    </div>
    <div id="currentLevelControl" style="width: 100%;">
        <button id="autoBtn" type="button" class="btn btn-success">Auto</button>
    </div>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'videojs-preroll-v2';
//畫質
import "videojs-http-source-selector";
import "videojs-contrib-quality-levels";
//---

//css
import 'video.js/dist/video-js.css'
import 'videojs-contrib-ads/dist/videojs-contrib-ads.css';
import 'videojs-ima/src/css/videojs.ima.css';
import 'videojs-preroll-v2/dist/videojs-preroll.css';


useHead({
    script: [{
        src: "http://imasdk.googleapis.com/js/sdkloader/ima3.js",
    }]
});

const liveType = 'application/x-mpegURL';

const events = [
    'controlsdisabled',
    'controlsenabled',
    'dispose',
    'durationchange',
    'ended',
    'enterFullWindow',
    'enterpictureinpicture',
    'error',
    'exitFullWindow',
    'firstplay',
    'fullscreenchange',
    'leavepictureinpicture',
    'loadedmetadata',
    'loadstart',
    'pause',
    'play',
    'playerreset',
    'playerresize',
    'playing',
    'posterchange',
    'ratechange',
    'ready',
    'resize',
    'seeked',
    'seeking',
    'textdata',
    'timeupdate',
    'useractive',
    'userinactive',
    'volumechange',
    'waiting',
];
const adsEvents = [
    'ads-request',	//請求廣告數據
    'ads-load',    //廣告數據在收到廣告請求後可用
    'ads-pod-started',	//線性廣告連播已啟動
    'ads-pod-ended',	//線性廣告連播已完成
    'ads-allpods-completed',	//所有線性廣告已完成
    'ads-ad-started',	//廣告開始播放
    'ads-ad-ended',	//廣告播放完畢
    'ads-first-quartile',	//廣告播放頭越過第一個四分位
    'ads-midpoint',//廣告播放頭越過中點
    'ads-third-quartile',//	廣告播放頭越過第三個四分位
    'ads-pause',	//廣告已暫停
    'ads-play',	//廣告恢復了
    'ads-volumechange',     //廣告量已更改
    'ads-click',	//廣告被點擊
];

let videoOptions = {
    language: 'zh-CN',
    autoplay: 'true',
    preload: "auto",
    fill: true,                       //填充模式
    fluid: true,                      //will wait for the video to load to calculate the aspect ratio of the video
    controls: true,
    responsive: true,                 //響應式內部按鈕
    playsinline: true,

    // Make the text track settings dialog not initialize.
    textTrackSettings: false,
    qualityLevels: true,
    controlBar: {
        fullscreenToggle: true,        //全螢幕關閉
        pictureInPictureToggle: false,  //子母畫面關閉
        liveDisplay: true,             //live 字樣關閉
        volumePanel: {
            inline: true                //可以调整方向为水平(true)或者垂直(false)
        },
    },
    userActions: {
        doubleClick: false
    },
    httpSourceSelector: {

        default: 'high'
    }
};

let player;



onMounted(() => {
    initVideoPlay();
    defaultPlay();
});

onBeforeUnmount(() => {
    if (player != null) {
        player.dispose();
    }
});


//初始化 videoPlay
function initVideoPlay() {
    player = videojs('video', videoOptions, onReady);
    events.forEach(eventName => player.on(eventName, () => { handleEvent(eventName); }));
}

function onReady() {
    console.log(" player onReady");
    player.httpSourceSelector();
    // 播放前廣告套件 
    // player.preroll({
    //     src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    //     href: 'https://www.google.com.tw/',
    //     allowSkip: true,
    //     skipTime: 5,
    // });
    /////////////////////////////////
    // ima廣告 套件 ----
    // var adsOptions = {
    //     debug: true,
    //     id: 'video',
    //     adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
    // };
    // player.ima(adsOptions);
    //-------------------------
}

//預設播放
function defaultPlay() {
    setVideoSource();
    player.muted(true);
    player.play();
}
// https://pulltv2.wanfudaluye.com/live/tv2.m3u8
// https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8
//設定直播來源
function setVideoSource() {
    player.src({
        src: 'https://aliplay2.xinzhongjituan.com/live/4024_1678930814.m3u8?auth_key=1678949379-0-0-d06cc136d15a08f7079488c84c26af40',
        type: liveType,
    });
}
//設定videoPlay event
function handleEvent(eventName) {
    // console.log('eventName :'+ eventName);
    switch (eventName) {
        case 'play':
            console.log('play :' + eventName);
            break;
        case 'timeupdate':
            return
        case 'playing':
            console.log('playing :' + eventName);
            break;
        case 'pause':
            console.log("pause");
            break;
        case 'error':
            console.log('event:error  視頻撥放無法連線，請確認來源是否可正常撥放，或請檢查網路是否正常');
            break;
        case 'durationchange':
            console.log('更改來源event');
            break;
        case 'fullscreenchange':
            console.log('fullscreenchange');
            break;
        default:
            // console.log('eventName :'+ eventName);
            return
    }
}

//video.js version8 up
function createQulitysBtn() {
    var button = videojs.getComponent('Button');
    class qualitysButton extends button {
        constructor(player, options) {
            super(player, options);
            this.addClassTag();
        }
        addClassTag() {
            this.addClass('quality');
        }

        handleClick(event) {
            console.log("event", event);
            this.addClass('show_quality');
        }
    }

    videojs.registerComponent('qualitysButton', qualitysButton);
    player.controlBar.addChild('qualitysButton', {}, player.controlBar.children().length - 1);
}

function qualityLevelSelectCreate() {
    player.one('loadedmetadata', () => {
        const container = document.getElementById('currentLevelControl');
        const autoBtn = document.getElementById('autoBtn');
        const btnList = [];
        // create a button for every video quality level 
        for (let i = 0; i < player.qualityLevels().length; i++) {
            let level = player.qualityLevels()[i];
            if (level.width === undefined) {
                continue;
            }
            let levelElm = document.createElement('button');
            levelElm.classList.add('btn');
            if (player.qualityLevels().selectedIndex === i) {
                levelElm.classList.add('btn-success');
            }
            levelElm.setAttribute('title', level.label);
            levelElm.setAttribute('type', 'button');
            levelElm.setAttribute('data-level', i);
            levelElm.innerText = `${i} ('${level.width}': ${level.height}p, ${(level.bitrate / 1024).toFixed(0)}kb)`;
            btnList.push(levelElm);
            container.append(levelElm);
        }
        // attach a click handler to buttons
        for (const btn of btnList) {
            btn.addEventListener('click', (event) => {
                const selectedIndex = player.qualityLevels().selectedIndex;
                const btnIndex = event.target.dataset.level;
                autoBtn.classList.remove('btn-success');
                if (selectedIndex == btnIndex) {
                    return;
                }
                btnList.forEach((elm) => {
                    player.qualityLevels()[elm.dataset.level].enabled = elm.dataset.level === btnIndex;
                });
            });
        }
        // update buttons on video quality changes
        player.qualityLevels().on('change', (event) => {
            for (let btn of btnList) {
                if (btn.dataset.level == event.selectedIndex) {
                    btn.classList.add('btn-success');
                } else {
                    btn.classList.remove('btn-success');
                }
            }
        });
        // add a click handler to reset previously selected video quality by the user
        autoBtn.addEventListener('click', (event) => {
            btnList.forEach((elm) => {
                player.qualityLevels()[elm.dataset.level].enabled = true;
            });
            autoBtn.classList.toggle('btn-success', true);
        });
    });
}
//----------------------------------
</script>

<style lang="scss">
.video_player {
    position: relative;
    width: 700px;
    height: 500px;
}

.btn {
    background-color: #5cb85c;
    border-radius: 0.5em;
    border: 1px solid #18ab29;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-size: 1em;
    padding: 0.5em;
    margin: 0.25em 0.25em 0.25em 0;
}

.btn-success {
    font-weight: bold;
    background-color: #337ab7;
}

.quality {
    position: relative !important;
    height: 100% !important;
    margin: 0px 10px !important;
    background: #18ab29 !important;
}

.advertisement-box,
.preroll-skip-button,
.remaining-time {
    background-color: rgb(0 0 0 / 40%);
}
</style>