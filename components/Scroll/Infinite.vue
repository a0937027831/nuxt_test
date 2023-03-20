<template>
    <ul class="main_list" ref="listEl">
        <li class="info" v-for="item in initNewsList" :key="item.id">
            <div class="img_warpper">
                <img :src="item.img_url" alt="">
            </div>
            <div class="info_title">
                <div>
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.sub_title }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
const listEl = ref(null);
const initNewsList = ref((await useLazyHttp('/web/redirectWeb/getNewsList?parameter=1')).data.data.list);

const getUsersOnScroll = async () => {
    console.log("useInfiniteScroll");

    await new Promise((res) => setTimeout(res, 2000));
    const newUsers = (await useLazyHttp('/web/redirectWeb/getNewsList?parameter=1')).data.data.list;
    initNewsList.value.push(...newUsers);
}
useInfiniteScroll(
    listEl,
    async () => {
        await getUsersOnScroll();
    },
    { distance: 10 }
);
</script>

<style lang="scss" scoped>
.main_list {
    height: 100vh;
    width: 1100px;
    overflow-y: scroll;
}

.info {
    display: flex;
    padding: 10px 25px;
    border-bottom: 1px solid #D9D9D9;
    background-color: #fff;
    width: 1078px;

    .img_warpper {
        position: relative;
        width: 25%;
        margin-right: 25px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        border-radius: 13px;

        img {
            position: relative;
            width: 100%;
            height: auto;


            &:hover {
                transform: scale(1.2);
                transition: 0.5s;
            }
        }
    }

    .info_title {
        width: 70%;
        padding: 8px 0px;
        border-bottom-width: 1px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h2 {
            position: relative;
            width: 100%;
            font-weight: 700;
            font-size: 22px;
            line-height: 30px;
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #3C3C3C;

            &:hover {
                color: #009AFF;
            }
        }

        p {
            font-size: 18px;
            line-height: 25px;
            margin-bottom: 8px;
            color: #7A7A7A;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
