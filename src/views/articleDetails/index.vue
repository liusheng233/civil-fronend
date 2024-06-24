<script setup lang="ts">
  import { getArticlesDetail } from '@/api/article';
  import { RepostedContent } from '@/api/article/type';
  import { onMounted, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getIndexRanksById } from '@/api/home';
  import { IndexRanksPart } from '@/api/home/types';
  import carouselFlight from '@/assets/images/carousel-flight.png';
  import carouselFlight2 from '@/assets/images/carousel-flight2.png';
  import { FlightForm } from '@/views/home/index.vue';

  const top10 = ref<IndexRanksPart>();
  const rankAssociation = ref<IndexRanksPart>();
  const router = useRouter();
  const route = useRoute();
  const breadList = route.matched;

  onMounted(async () => {
    let articleId: any = route.query.articleId;
    const result = await getArticlesDetail(articleId);
    console.log(result);
    Object.assign(article, result);
    top10.value = await getIndexRanksById(2);
    if (top10.value?.repostedContents != undefined) {
      top10.value.repostedContents = top10.value.repostedContents.slice(0, 6);
    }
    rankAssociation.value = await getIndexRanksById(article.rankPartId);
    if (rankAssociation.value?.repostedContents != undefined) {
      rankAssociation.value.repostedContents = rankAssociation.value.repostedContents.slice(0, 8);
    }
    console.log(top10.value);
    console.log(breadList);
  });

  const toArticle = (articleId: number | null) => {
    router.push({
      path: '/index-articles-detail',
      query: {
        articleId: articleId,
      },
    });
  };

  const article: RepostedContent = reactive({
    contentId: 0, // 假设默认值为 0 或者其他合适的默认值
    content: '',
    author: '',
    articleId: 0,
    republishedTitle: '',
    contentUrl: '',
    original: 0, // 假设默认值为 0，表示不是原文
    viewCount: 0,
    sourceName: '',
    sourceUrl: '',
    originDate: new Date(), // 默认为当前日期
    status: 0, // 假设默认值为 0，表示编辑中
    reason: '',
    version: 0,
    repostedUserId: 0,
    creationDate: new Date(), // 默认为当前日期
    updateDate: new Date(), // 默认为当前日期
    isDeleted: 0, // 假设默认值为 0，表示未删除
    rankPartId: 0,
    rankPartLevel: 0,
    rankPartMethod: 0, // 假设默认值为 0，表示创建
    republishedTitleImgUrl: '',
  });
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
      <el-breadcrumb-item :to="{ path: '/index-articles-list', query: { rankTypeId: article.rankPartId } }">{{
        rankAssociation?.rankPartName
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.republishedTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="article">
    <div class="article-detail">
      <div class="article-detail-title">{{ article.republishedTitle }}</div>
      <div class="article-detail-info">
        <div class="article-detail-info-left"
          ><span>{{ article.updateDate }} 来源: {{ article.sourceName }} 作者: {{ article.author }}</span></div
        >
        <div class="article-detail-info-origin"
          ><el-icon class="article-detail-info-icon" color="white" size="30px"><Link /></el-icon
        ></div>
        <div class="article-detail-info-share"
          ><el-icon class="article-detail-info-icon" color="white" size="30px"><Share /></el-icon
        ></div>
      </div>
      <div class="article-detail-content" v-html="article.content"></div>
    </div>
    <div class="article-right">
      <div class="article-right-ad"> </div>
      <div class="article-right-hot">
        <!--    综合资讯top10-->
        <div class="home-rank-top10">
          <div class="home-rank-top10-title">
            <div class="home-rank-top10-title-name"><span>综合</span><span>资讯</span><span>Top10</span></div>
            <div class="home-rank-top10-title-more">更多→</div>
          </div>
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
        <div class="home-rank-innovation">
          <div class="home-rank-innovation-title">
            <div class="home-rank-innovation-title-name"><span>创新</span><span>与</span><span>前沿</span><span>技术</span></div>
            <div class="home-rank-innovation-title-more">更多→</div>
          </div>
          <div
            class="home-rank-innovation-article home-rank-article"
            v-for="(item, index) in rankAssociation?.repostedContents"
            :key="index"
            @click="toArticle(item.contentId)"
          >
            <div class="home-rank-innovation-article-top1" v-if="index == 0">
              <div class="home-rank-innovation-article-title">
                <div class="home-rank-innovation-article-title-content">{{ item.republishedTitle }}top1</div>
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

  .article {
    width: 60%;
    margin: 0 20%;
    //border: #00ced1 1px solid;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-height: 494px;
  }

  .article-detail {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .article-detail-title {
    font-size: 20px;
    margin: 10px;
    font-weight: bold;
  }

  .article-detail-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .article-detail-info-left {
    background-color: rgb(166 179 219);
    width: 80%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #f9f8ff;
    padding-left: 10px;
  }

  .article-detail-info-origin {
    background: linear-gradient(to bottom, #4e75f1, #1d235a);
    padding: 5px;
    width: 40px;
    height: 40px;
  }

  .article-detail-info-icon:hover {
    color: #2c3e50;
    cursor: pointer;
  }

  .article-detail-info-share {
    background: linear-gradient(to bottom, #4e75f1, #1d235a);
    padding: 5px;
    width: 40px;
    height: 40px;
  }

  .article-detail-content {
    margin: 10px 2px;
  }

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

  .home-rank-top10 {
    background: linear-gradient(to bottom, #4e75f1, #1d235a);
    //border: 1px solid #8a2be2;
    display: flex;
    flex-direction: column;
    color: #f9f8ff;
    margin-top: 30px;
  }

  .home-rank-top10 :first-child > .home-rank-top10-article-before {
    color: #f9f8ff;
  }

  .home-rank-top10-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-top10-title-name {
    margin-left: 10px;
    font-size: 32px;
    border-bottom: 4px solid #f9f8ff;
  }

  .home-rank-top10-title-more {
    line-height: 26.67px;
    padding-left: 10px;
    padding-top: 20px;
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

  .home-rank-innovation {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  .home-rank-innovation-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-innovation-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-innovation-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
  }

  .home-rank-innovation-article {
    display: flex;
  }

  .home-rank-innovation-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-innovation-article-else {
    width: 100%;
    margin: 4px 0;
  }

  .home-rank-innovation-title-name :first-child {
    color: red;
  }
</style>
