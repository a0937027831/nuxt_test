<template>
    <div class="wrapper progressValue">
        <div class="blank"></div>
        <div class="wrapper1">
            <div class="img1">
                <h2 class="title1">Lorem ipsum<br><span>Dolor sit amet.</span></h2>
            </div>
        </div>
        <div class="wrapper2">
            <div class="img2">
                <h2 class="title2">Lorem ipsum<br><span>Dolor sit amet.</span></h2>
            </div>
        </div>
        <form>
            <select v-model="locale">
                <option value="en">en</option>
                <option value="zh_tw">zh-tw</option>
            </select>
            <p>{{ $t('title') }}</p>
        </form>
        <div class="blank"> {{ $t('title') }}</div>
    </div>
</template>


<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref } from "vue";
import { signOutUser } from "~~/composables/useFirebase";
type userkey = "email" | "password";
type user = Record<userkey, string>;
const darkMode = ref(false);
gsap.registerPlugin(ScrollTrigger);
const triggers = ScrollTrigger.getAll();
const { locale } = useI18n();
console.log("t :", locale);

const userdata: user = reactive({
    email: '',
    password: '',
})

function getObjectByKey<T, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

let test = getObjectByKey(userdata, 'email');
console.log(test);


async function sign() {
    const credentials = await signInUser(userdata.email, userdata.password);
    console.log(credentials);
}

async function signOut() {
    const credentials = await signOutUser();
    console.log(credentials);
}

function startAnimation() {
    var t1 = gsap.timeline();
    t1.to(".img1", { width: '100%', height: '100%' });

    ScrollTrigger.defaults({
        toggleActions: "restart complete reverse none",
        markers: true,
    });

    ScrollTrigger.create({
        animation: t1,
        trigger: ".wrapper1",
        start: "top",
        end: "bottm+=4000px",
        scrub: 3,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => { console.log('enter') },
        onLeave: () => { console.log('Leave') },
        onEnterBack: () => { console.log('enter back') },
        onLeaveBack: () => { console.log('all the way back') },
        onUpdate: (self) => { console.log('update', self.progress.toFixed(3)) },
        onToggle: (self) => { console.log("toggled", self.isActive) },
        toggleClass: "active",
        id: "my-id"
    });

    const progress = gsap.timeline();
    progress.to(".progressValue", { width: '100%' })

    ScrollTrigger.create({
        animation: progress,
        trigger: ".banner",
        endTrigger: ".footer",
        start: "top top",
        end: "top bottom",
        scrub: 1,
    });
    // gsap.to(".img1", {
    //     scrollTrigger: {
    //         markers: true,
    //         trigger: ".wrapper1",
    //         scrub: 3,
    //         toggleActions: "restart complete reverse none",
    //         start: "top-=200px",
    //         end: "top",
    //     },
    //     width: '100%',
    //     height: '100%',
    //     duration: 2,
    // });
    // gsap.to(".title1", {
    //     scrollTrigger: {
    //         markers: true,
    //         trigger: ".wrapper1",
    //         toggleActions: "restart complete reverse none",
    //         start: "top",
    //         end: "bottom",
    //     },
    //     scale: 1,
    //     opacity: 1,
    //     duration: 0.5,
    // });
}

onMounted(() => {
    ScrollTrigger.refresh();
    startAnimation();
});
onUnmounted(() => {
    triggers.forEach((trigger) => {
        trigger.kill();
    });
    ScrollTrigger.clearMatchMedia();
});

</script>

<style lang="scss">
html {
    box-sizing: border-box;
    font-size: 100%;
}

*,
*:before,
*:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}

body {
    width: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: 'Open Sans', sans-serif;
    overflow-x: hidden;
    color: black;
    font-size: 16px;
}

.blank {
    width: 100%;
    height: 100vh;
}

.wrapper {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.wrapper1 {
    width: 100%;
    height: 100vh;
    // background: #fac282;
}

.wrapper2 {
    width: 100%;
    height: 100vh;
    background: #3dc2ff;
}

.img1 {
    background-image: url('@/assets/images/people.gif');
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
}


.title1 {
    position: absolute;
    top: 50%;
    left: 20%;
    font-size: 32px;
    transform: translate(-50%, -50%);
    opacity: 0;
    scale: 0;
}

.title1 span {
    font-size: 24px;
    font-weight: 400;
    display: block;
}

.img2 {
    background: url('@/assets/images/cat.gif');
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;
}


.title2 {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 60px;
    transform: translate(-50%, -50%);
    transform-origin: center center;
    text-align: center;
    line-height: 80px;
}
</style>
<!-- /*<div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
        <div class="min-f-full">
            <div class="mx-auto sm:px-6 lg:max-w-7xl lg:px-8 flex flex-row">
                Lieft SideBar
                <div class="md:block">
                    <div class="sticky top-0">
                        <SideBarLeft></SideBarLeft>
                    </div>
                </div>
                Main content
                <input class="w-44 mx-5 h-12" type="text" placeholder="Email" v-model="userdata.email">
                <input class="w-44 mx-5 h-12" type="password" placeholder="Password" v-model="userdata.password">
                <button class="bg-white w-44 h-12 rounded border mx-5" @click="sign">Submit</button>
                <button class="bg-white w-44 h-12 rounded border mx-5" @click="signInWithGoogle">Sign In With
                    Google</button>
                <button class="bg-white w-44 h-12 rounded border mx-5" @click="signOut">signOut</button>
                <ScrollInfinite></ScrollInfinite>
                Right Sidebar
            </div>
        </div>
    </div>
</div>
 */ -->

<!-- /*                       
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *          佛祖保佑       永不宕机     永无BUG
*/ -->

