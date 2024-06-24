<script setup lang="ts">
  import { getRepostedContentsPageByRankPart } from '@/api/article';
  import { Page, RepostedContent } from '@/api/article/type';
  import { ref } from 'vue';
  import { getIndexRanksById } from '@/api/home';
  import { IndexRanksPart } from '@/api/home/types';
  import carouselFlight from '@/assets/images/carousel-flight.png';
  import carouselFlight2 from '@/assets/images/carousel-flight2.png';
  import { FlightForm } from '@/views/home/index.vue';

  const route = useRoute();
  const router = useRouter();
  const rankTypeId = Number(route.query.rankTypeId);
  const page = ref<Page<RepostedContent>>({
    size: 10,
    current: 1,
    total: 0,
    records: [],
    orders: [],
  });
  const top10 = ref<IndexRanksPart>();
  const rankAssociation = ref<IndexRanksPart>();
  onMounted(async () => {
    page.value = await getRepostedContentsPageByRankPart(rankTypeId, page);
    top10.value = await getIndexRanksById(2);
    if (top10.value?.repostedContents != undefined) {
      top10.value.repostedContents = top10.value.repostedContents.slice(0, 6);
    }
    rankAssociation.value = await getIndexRanksById(rankTypeId);
    if (rankAssociation.value?.repostedContents != undefined) {
      rankAssociation.value.repostedContents = rankAssociation.value.repostedContents.slice(0, 8);
    }
    console.log(rankAssociation.value);
  });

  const toArticle = (articleId: number | null) => {
    router.push({
      path: '/index-articles-detail',
      query: {
        articleId: articleId,
      },
    });
  };

  const flightForm = ref<FlightForm>({
    dep: '',
    arr: '',
    flno: '',
  });
  const imgList: string[] = [carouselFlight, carouselFlight2, carouselFlight, carouselFlight2];
  const flightSearch = () => {
    // TODO 航班查询
    console.log(flightForm.value);
  };
</script>

<template>
  <div class="home-carousel">
    <el-carousel height="440px" motion-blur :interval="4000">
      <el-carousel-item v-for="item in imgList" :key="item">
        <el-image style="height: 520px" :src="item" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="home-flight">
    <el-form class="home-flight-form" :model="flightForm" label-width="auto">
      <div class="home-flight-title">航班动态</div>
      <el-form-item class="home-flight-flno">
        <el-input v-model="flightForm.flno" placeholder="请输入航班号" />
      </el-form-item>
      <el-form-item class="home-flight-dep">
        <el-input v-model="flightForm.dep" placeholder="请输入出发城市" />
      </el-form-item>
      <el-form-item class="home-flight-arr">
        <el-input v-model="flightForm.arr" placeholder="请输入到达城市" />
      </el-form-item>
      <el-form-item class="home-flight-submit">
        <el-button color="rgb(234, 24, 69)" type="primary" style="width: 130px" @click="flightSearch"
          ><el-icon><Search /></el-icon><span> 搜索</span></el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <div class="breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ rankAssociation?.rankPartName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="main">
    <div class="articleList">
      <div class="articleList-one" v-for="(item, index) in page.records" :key="index">
        <div class="articleList-one-line"> </div>
        <div class="articleList-one-detail" @click="toArticle(item.contentId)">
          <div class="articleList-one-detail-title">
            <div class="articleList-one-detail-title-title">{{ item.republishedTitle }}</div>
            <div class="articleList-one-detail-title-info">{{ item.sourceName }} {{ item.updateDate }}</div>
          </div>
          <div class="articleList-one-detail-content" v-html="item.content"></div>
        </div>
      </div>
    </div>
    <div class="article-right">
      <div class="article-right-ad"> </div>
      <div class="article-right-hot">
        <!--    综合资讯top10-->
        <div class="home-rank-top10-title">
          <div class="home-rank-top10-title-name"><span>热点排名</span></div>
          <div class="home-rank-top10-title-more">更多→</div>
        </div>
        <div class="home-rank-top10">
          <div
            class="home-rank-top10-article home-rank-article"
            v-for="(item, index) in top10?.repostedContents"
            :key="index"
            @click="toArticle(item.contentId)"
          >
            <div
              class="home-rank-top10-article-before"
              :class="{ redPlace: index == 0, orangePlace: index == 1, greenPlace: index == 2 }"
              >{{ index + 1 }}</div
            >
            <div class="home-rank-top10-article-top1" v-if="index == 0">
              <div class="home-rank-top10-article-title">
                <div class="home-rank-top10-article-title-content"
                  >{{
                    item.republishedTitle
                  }}top1---------------------------------------------------------------------------------------------</div
                >
              </div>
            </div>
            <div class="home-rank-top10-article-else" v-else>
              <div class="home-rank-top10-article-title">
                <div class="home-rank-top10-article-title-content">{{ item.republishedTitle }}</div>
              </div>
              <div class="home-rank-top10-article-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="article-right-rank">
        <!--    创新与前沿技术-->
        <div class="home-rank-innovation-title">
          <div class="home-rank-innovation-title-name"><span>相关排行</span></div>
          <div class="home-rank-innovation-title-more">更多→</div>
        </div>
        <div class="home-rank-innovation">
          <div
            class="home-rank-innovation-article home-rank-article"
            v-for="(item, index) in rankAssociation?.repostedContents"
            :key="index"
            @click="toArticle(item.contentId)"
          >
            <div class="home-rank-innovation-article-top1" v-if="index == 0">
              <div class="home-rank-innovation-article-title">
                <div class="home-rank-innovation-article-title-content">{{ item.republishedTitle }}top11111111111111</div>
                <div class="home-rank-innovation-article-title-img"></div>
              </div>
            </div>
            <div class="home-rank-innovation-article-else" v-else>
              <div class="home-rank-innovation-article-title">
                <div class="home-rank-innovation-article-title-content">{{ item.republishedTitle }}</div>
              </div>
              <div class="home-rank-innovation-article-line home-rank-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .home-carousel {
    min-height: 300px;
  }

  /deep/ .el-carousel__indicators {
    //margin-left: 300px;
    margin-bottom: 70px;
  }

  // 飞行器查询
  .home-flight {
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding-top: 20px;
    height: 70px;
    //background-color: #ff6900;
    position: relative;
    width: 100%;
    margin-top: -70px;
    //border: 1px solid #ff6900;
    background-color: rgb(75 113 233 / 20%);
    z-index: 1;
  }

  .home-flight-form {
    width: 60%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /deep/ .el-form-item {
    margin-bottom: 0;
  }

  .home-flight-title {
    font-size: 24px;
    color: white;
    width: 100px;
    margin-right: 10px;
  }

  .home-flight-flno {
    height: 40px;
    width: 220px;
    margin-right: 10px;
  }

  .home-flight-dep {
    height: 40px;
    width: 220px;
    margin-right: 10px;
  }

  .home-flight-arr {
    height: 40px;
    width: 220px;
    margin-right: 10px;
  }

  .home-flight-submit {
    width: 100px;
  }

  .home-flight-submit > button {
    width: 100px;
  }

  .breadcrumb {
    width: 60%;
    margin: 44.8px 20% 0;
  }

  .main {
    display: flex;
    flex-direction: row;
    width: 60%;
    margin: 40px 20%;
    min-height: 554px;
  }

  .articleList {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .articleList-one {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  //.articleList-one-line {
  //  width: 100%;
  //  height: 2px;
  //  background: linear-gradient(to right, red 20px, lightgray 20px);
  //  margin-bottom: 10px;
  //}
  .articleList-one-detail {
    display: flex;
    flex-direction: column;
  }

  .articleList-one-detail-title {
    display: flex;
    flex-direction: row;
    margin-bottom: 4px;
  }

  .articleList-one-detail-title-title {
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: auto;
    font-size: 20px;
  }

  .articleList-one-detail-title-info {
    /* 同样设置为不缩放 */
    flex-shrink: 0;

    /* 自动根据内容调整宽度 */
    flex-grow: 0;
    color: rgb(197 197 197);
  }

  .articleList-one-detail-content {
    color: rgb(197 197 197);
    transition: color 0.3s, text-shadow 0.3s;
    font-size: 14px;
  }

  .articleList-one-detail-content:hover {
    color: rgb(0 0 0); /* 鼠标悬停时的颜色，这里以黑色为例 */
    text-shadow: 1px 1px 4px rgb(0 0 0 / 50%); /* 添加阴影效果，这里设置了一个简单的阴影示例，可根据需要调整 */
    cursor: pointer;
  }

  .articleList-one-line {
    width: 100%;
    height: 2px;

    /* 初始状态：红色在左边，灰色覆盖剩余部分 */
    background: linear-gradient(to right, red 20px, lightgray 20px);
    //background-size: 20px 100%; /* 控制渐变条的宽度 */
    margin-bottom: 10px;

    /* 使用动画来改变背景位置 */
    //animation: slideGradient 0.3s forwards; /* forwards保持动画最后一帧 */
  }

  /* 定义动画 */
  //@keyframes slideGradient {
  //  from {
  //    /* 初始状态，红色在左边 */
  //    background-position: 0% center;
  //  }
  //  to {
  //    /* 结束状态，绿色在右边 */
  //    /* 注意这里改变了渐变的定义，确保绿色在右侧，红色在初始位置超出可视范围 */
  //    background: linear-gradient(to right, green 20px, gray 20px) right center no-repeat;
  //    background-position: 100% center;
  //  }
  //}

  //.articleList-one:hover > .articleList-one-line {
  //  /* 当鼠标悬停在.content上时，影响紧邻的.line */
  //  background-position: right center; /* 改变背景位置，使绿色部分从右侧滑入 */
  //}

  .home-rank-line {
    margin: 4px 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, red 10%, gray 20%);
  }

  .article-right {
    display: flex;
    flex-direction: column;
    margin: 19.2px 0 90px 30px;
    width: 30%;
  }

  .article-right-ad {
    width: 300px;
    height: 160px;
    background: #ff6900;
  }

  .home-rank-article {
    cursor: pointer;
    // 添加动画效果
  }

  .article-right-hot {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  .home-rank-top10 {
    background: rgb(79 118 244);
    //border: 1px solid #8a2be2;
    display: flex;
    flex-direction: column;
    color: #f9f8ff;
  }

  .home-rank-top10 :first-child > .home-rank-top10-article-before {
    color: #f9f8ff;
  }

  .home-rank-top10-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-top10-title-name {
    //margin-left: 10px;
    font-size: 24px;
    border-bottom: 4px solid #f9f8ff;
  }

  .home-rank-top10-title-more {
    font-size: 14px;
    color: gray;
    line-height: 40px;
    padding-left: 10px;
    //padding-top: 20px;
  }

  .home-rank-top10-article {
    display: flex;
    padding: 10px 20px;
  }

  .home-rank-top10-article-before {
    background-color: rgb(34 65 165);
    min-width: 20px;
    text-align: center;
    align-self: center; /* 垂直居中 */
    margin-right: 20px;
  }

  .redPlace {
    background-color: rgb(234 24 69);
  }

  .orangePlace {
    background-color: rgb(246 125 61);
  }

  .greenPlace {
    background-color: rgb(34 204 174);
  }

  .article-right-rank {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .home-rank-innovation {
    display: flex;
    flex-direction: column;
    border: 1px lightgray solid;
    border-top: 6px red solid;
    padding: 4px;
  }

  .home-rank-innovation-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-innovation-title-name {
    //margin-left: 10px;
    font-size: 24px;
    border-bottom: 4px solid #f9f8ff;
  }

  .home-rank-innovation-title-more {
    font-size: 14px;
    color: gray;
    line-height: 40px;
    padding-left: 10px;
  }

  .home-rank-innovation-article {
    display: flex;
  }

  .home-rank-innovation-article-top1 {
    background-color: rgb(245 245 245);
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
  }

  .home-rank-innovation-article-top1 > .home-rank-innovation-article-title {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .home-rank-innovation-article-top1 .home-rank-innovation-article-title-content {
    width: 45%;
    padding: 4px;
  }

  .home-rank-innovation-article-top1 .home-rank-innovation-article-title-img {
    width: 55%;
    background-color: #ff6900;
  }

  .home-rank-innovation-article-else {
    width: 100%;
    margin: 4px 0;
  }
</style>
