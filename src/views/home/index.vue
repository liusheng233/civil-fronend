<script setup lang="ts">
  import { getIndexRanks } from '@/api/home';
  import { IndexRanksPart, RepostedContent } from '@/api/home/types';
  import carouselFlight from '@/assets/images/carousel-flight.png';
  import carouselFlight2 from '@/assets/images/carousel-flight2.png';

  export interface FlightForm {
    dep: string;
    arr: string;
    flno: string;
  }

  const ranksPart = ref<IndexRanksPart[]>([]);
  const cnDynamics = ref<RepostedContent[]>([]);
  const top10 = ref<RepostedContent[]>([]);
  const serviceAndSecurity = ref<RepostedContent[]>([]);
  const inDynamics = ref<RepostedContent[]>([]);
  const buildInfo = ref<RepostedContent[]>([]);
  const invest = ref<RepostedContent[]>([]);
  const innovation = ref<RepostedContent[]>([]);
  const flightForm = ref<FlightForm>({
    dep: '',
    arr: '',
    flno: '',
  });

  onMounted(async () => {
    ranksPart.value = await getIndexRanks();
    console.log(ranksPart.value);
    cnDynamics.value = ranksPart.value[0].repostedContents;
    top10.value = ranksPart.value[1].repostedContents;
    serviceAndSecurity.value = ranksPart.value[2].repostedContents;
    inDynamics.value = ranksPart.value[3].repostedContents;
    buildInfo.value = ranksPart.value[4].repostedContents;
    invest.value = ranksPart.value[5].repostedContents;
    innovation.value = ranksPart.value[6].repostedContents;
  });
  const router = useRouter();

  const imgList: string[] = [carouselFlight, carouselFlight2, carouselFlight, carouselFlight2];

  const toArticle = (articleId: number | null) => {
    router.push({
      path: '/index-articles-detail',
      query: {
        articleId: articleId,
      },
    });
  };

  const toArticleList = (rankTypeId: number) => {
    router.push({
      path: '/index-articles-list',
      query: {
        rankTypeId: rankTypeId,
      },
    });
  };

  const flightSearch = () => {
    // TODO 航班查询
    console.log(flightForm.value);
  };
</script>

<template>
  <div class="home-carousel">
    <el-carousel height="440px" motion-blur>
      <el-carousel-item v-for="item in imgList" :key="item">
        <el-image style="height: 520px" :src="item" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="home-flight">
    <el-form class="home-flight-form" :model="flightForm" label-width="auto" style="max-width: 600px">
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
  <div class="home-rank">
    <!--    国内动态-->
    <div class="home-rank-cnDynamics">
      <div class="home-rank-cnDynamics-title">
        <div class="home-rank-cnDynamics-title-name"><span>国内</span><span>动态</span></div>
        <div class="home-rank-cnDynamics-title-more" @click="toArticleList(1)">更多→</div>
      </div>
      <div
        class="home-rank-cnDynamics-article home-rank-article"
        v-for="(item, index) in cnDynamics"
        :key="index"
        @click="toArticle(item.contentId)"
      >
        <div class="home-rank-cnDynamics-article-top1" v-if="index == 0">
          <div class="home-rank-cnDynamics-article-title">
            <div class="home-rank-cnDynamics-article-title-content">{{ item.republishedTitle }}top1</div>
          </div>
        </div>
        <div class="home-rank-cnDynamics-article-else" v-else>
          <div class="home-rank-cnDynamics-article-title">
            <div class="home-rank-cnDynamics-article-title-content">{{ item.republishedTitle }}</div>
          </div>
          <div class="home-rank-cnDynamics-article-line home-rank-line"></div>
        </div>
      </div>
    </div>
    <!--    综合资讯top10-->
    <div class="home-rank-top10">
      <div class="home-rank-top10-title">
        <div class="home-rank-top10-title-name"><span>综合</span><span>资讯</span><span>Top10</span></div>
        <div class="home-rank-top10-title-more" @click="toArticleList(2)">更多→</div>
      </div>
      <div class="home-rank-top10-article home-rank-article" v-for="(item, index) in top10" :key="index" @click="toArticle(item.contentId)">
        <div class="home-rank-top10-article-before" :class="{ redPlace: index == 0, orangePlace: index == 1, greenPlace: index == 2 }">{{
          index + 1
        }}</div>
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
    <!--    航空服务与安全-->
    <div class="home-rank-serviceAndSecurity">
      <div class="home-rank-serviceAndSecurity-title">
        <div class="home-rank-serviceAndSecurity-title-name"><span>航空</span><span>服务</span><span>与</span><span>安全</span></div>
        <div class="home-rank-serviceAndSecurity-title-more" @click="toArticleList(3)">更多→</div>
      </div>
      <div
        class="home-rank-serviceAndSecurity-article home-rank-article"
        v-for="(item, index) in serviceAndSecurity"
        :key="index"
        @click="toArticle(item.contentId)"
      >
        <div class="home-rank-serviceAndSecurity-article-top1" v-if="index == 0">
          <div class="home-rank-serviceAndSecurity-article-title">
            <div class="home-rank-serviceAndSecurity-article-title-content">{{ item.republishedTitle }}top1</div>
          </div>
        </div>
        <div class="home-rank-serviceAndSecurity-article-else" v-else>
          <div class="home-rank-serviceAndSecurity-article-title">
            <div class="home-rank-serviceAndSecurity-article-title-content">{{ item.republishedTitle }}</div>
          </div>
          <div class="home-rank-serviceAndSecurity-article-line home-rank-line"></div>
        </div>
      </div>
    </div>
    <!--    国际资讯-->
    <div class="home-rank-inDynamics">
      <div class="home-rank-inDynamics-title">
        <div class="home-rank-inDynamics-title-name"><span>国际</span><span>资讯</span></div>
        <div class="home-rank-inDynamics-title-more" @click="toArticleList(4)">更多→</div>
      </div>
      <div
        class="home-rank-inDynamics-article home-rank-article"
        v-for="(item, index) in inDynamics"
        :key="index"
        @click="toArticle(item.contentId)"
      >
        <div class="home-rank-inDynamics-article-top1" v-if="index == 0">
          <div class="home-rank-inDynamics-article-title">
            <div class="home-rank-inDynamics-article-title-content">{{ item.republishedTitle }}top1</div>
          </div>
        </div>
        <div class="home-rank-inDynamics-article-else" v-else>
          <div class="home-rank-inDynamics-article-title">
            <div class="home-rank-inDynamics-article-title-content">{{ item.republishedTitle }}</div>
          </div>
          <div class="home-rank-inDynamics-article-line home-rank-line"></div>
        </div>
      </div>
    </div>
    <!--    机场建设项目信息-->
    <div class="home-rank-buildInfo">
      <div class="home-rank-buildInfo-title">
        <div class="home-rank-buildInfo-title-name"><span>机场</span><span>建设项目</span><span>信息</span></div>
        <div class="home-rank-buildInfo-title-more" @click="toArticleList(5)">更多→</div>
      </div>
      <div
        class="home-rank-buildInfo-article home-rank-article"
        v-for="(item, index) in buildInfo"
        :key="index"
        @click="toArticle(item.contentId)"
      >
        <div class="home-rank-buildInfo-article-top1" v-if="index == 0">
          <div class="home-rank-buildInfo-article-title">
            <div class="home-rank-buildInfo-article-title-content">{{ item.republishedTitle }}top1</div>
          </div>
        </div>
        <div class="home-rank-buildInfo-article-else" v-else>
          <div class="home-rank-buildInfo-article-title">
            <div class="home-rank-buildInfo-article-title-content">{{ item.republishedTitle }}</div>
          </div>
          <div class="home-rank-buildInfo-article-line home-rank-line"></div>
        </div>
      </div>
    </div>
    <!--    基建与投资-->
    <div class="home-rank-invest">
      <div class="home-rank-invest-title">
        <div class="home-rank-invest-title-name"><span>基建</span><span>与</span><span>投资</span></div>
        <div class="home-rank-invest-title-more" @click="toArticleList(6)">更多→</div>
      </div>
      <div
        class="home-rank-invest-article home-rank-article"
        v-for="(item, index) in invest"
        :key="index"
        @click="toArticle(item.contentId)"
      >
        <div class="home-rank-invest-article-top1" v-if="index == 0">
          <div class="home-rank-invest-article-title">
            <div class="home-rank-invest-article-title-content">{{ item.republishedTitle }}top1</div>
          </div>
        </div>
        <div class="home-rank-invest-article-else" v-else>
          <div class="home-rank-invest-article-title">
            <div class="home-rank-invest-article-title-content">{{ item.republishedTitle }}</div>
          </div>
          <div class="home-rank-invest-article-line home-rank-line"></div>
        </div>
      </div>
    </div>
    <!--    创新与前沿技术-->
    <div class="home-rank-innovation">
      <div class="home-rank-innovation-title">
        <div class="home-rank-innovation-title-name"><span>创新</span><span>与</span><span>前沿</span><span>技术</span></div>
        <div class="home-rank-innovation-title-more" @click="toArticleList(7)">更多→</div>
      </div>
      <div
        class="home-rank-innovation-article home-rank-article"
        v-for="(item, index) in innovation"
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
</template>

<style scoped lang="less">
  .home-carousel {
    min-height: 300px;
  }

  /deep/ .el-carousel__indicators {
    margin-left: 300px;
  }

  // 飞行器查询
  .home-flight {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    height: 400px;
    //background-color: #ff6900;
    position: relative;
    width: 24%;
    margin: 0 38%;
    margin-top: -400px;
    //border: 1px solid #ff6900;
    background-color: rgb(75 113 233 / 20%);
    z-index: 1;
  }

  .home-flight-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-flight-title {
    font-size: 50px;
    color: white;
    width: 80%;
    margin-bottom: 10px;
  }

  .home-flight-flno {
    height: 50px;
    width: 80%;
  }

  .home-flight-dep {
    width: 80%;
    height: 50px;
  }

  .home-flight-arr {
    width: 80%;
    height: 50px;
  }

  .home-flight-submit {
    align-self: flex-end;
    width: 130px;
    margin-right: 10%;
  }

  .home-flight-submit > button {
    width: 130px;
  }
  // 排行榜
  .home-rank {
    display: flex;
    flex-wrap: wrap; /* 允许项目换行 */
    justify-content: space-between; /* 主轴上的间隔对齐 */
    margin: 0 20%;
    min-height: 494px;
  }

  .home-rank > * {
    flex: 0 0 auto; /* 防止项目伸缩 */
    margin: 5px; /* 添加一些间距，可按需调整 */
    min-height: 200px;
    padding: 4px;
  }

  /* 第一行的项目 */
  //.home-rank > :nth-child(-n + 3) {
  //  /* 根据需求调整宽度，这里假设每个项目宽度相同 */
  //  width: calc(96% / 3);
  //}

  /* 第一个项目贴左 */
  .home-rank > :first-child {
    //align-self: flex-start; /* 贴左 */
    width: 25%;
  }

  /* 第二个项目居中 */
  .home-rank > :nth-child(2) {
    //align-self: center; /* 居中 */
    min-height: 200px;
    width: 40%;
    margin-top: -2px;
  }

  /* 第三个项目贴右 */
  .home-rank > :nth-child(3) {
    //align-self: flex-end; /* 贴右 */
    width: 25%;
  }

  /* 第二行和第三行的项目贴边 */
  .home-rank > :nth-child(n + 4):nth-child(-n + 6),
  .home-rank > :nth-child(n + 7):nth-child(-n + 8) {
    width: 45%; /* 占满整行 */
  }

  .home-rank-article {
    cursor: pointer;
    // 添加动画效果
  }

  /* 为每个类添加不同的背景色和边框 */
  .home-rank-cnDynamics {
    //background-color: #f0e68c;
    //border: 1px solid #008000;
    display: flex;
    flex-direction: column;
  }

  .home-rank-cnDynamics-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-cnDynamics-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-cnDynamics-title-name :first-child {
    color: red;
  }

  .home-rank-cnDynamics-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
    cursor: pointer;
  }

  .home-rank-cnDynamics-article {
    display: flex;
  }

  .home-rank-cnDynamics-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-cnDynamics-article-else {
    width: 100%;
    margin: 4px 0;
  }
  //.home-rank-cnDynamics-article-line {
  //  margin: 4px 0;
  //  width: 100%;
  //  height: 1px;
  //  background: linear-gradient(to right, red 20%, gray 20%);
  //}

  .home-rank-line {
    margin: 4px 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, red 10%, gray 20%);
  }

  .home-rank-top10 {
    background: linear-gradient(to bottom, #4e75f1, #1d235a);
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
    margin-left: 10px;
    font-size: 32px;
    border-bottom: 4px solid #f9f8ff;
  }

  .home-rank-top10-title-more {
    line-height: 26.67px;
    padding-left: 10px;
    padding-top: 20px;
    cursor: pointer;
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

  .home-rank-serviceAndSecurity {
    //background-color: #f08080;
    //border: 1px solid #fa8072;
    display: flex;
    flex-direction: column;
  }

  .home-rank-serviceAndSecurity-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-serviceAndSecurity-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-serviceAndSecurity-title-name :first-child {
    color: red;
  }

  .home-rank-serviceAndSecurity-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
    cursor: pointer;
  }

  .home-rank-serviceAndSecurity-article {
    display: flex;
  }

  .home-rank-serviceAndSecurity-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-serviceAndSecurity-article-else {
    width: 100%;
    margin: 4px 0;
  }

  //.home-rank-serviceAndSecurity-article-line {
  //  margin: 4px 0;
  //  width: 100%;
  //  height: 1px;
  //  background: linear-gradient(to right, red 20%, gray 20%);
  //}

  .home-rank-inDynamics {
    //background-color: #90ee90;
    //border: 1px solid #00ced1;
    display: flex;
    flex-direction: column;
  }

  .home-rank-inDynamics-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-inDynamics-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-inDynamics-title-name :first-child {
    color: red;
  }

  .home-rank-inDynamics-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
    cursor: pointer;
  }

  .home-rank-inDynamics-article {
    display: flex;
  }

  .home-rank-inDynamics-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-inDynamics-article-else {
    width: 100%;
    margin: 4px 0;
  }

  .home-rank-buildInfo {
    //background-color: #ffd700;
    //border: 1px solid #ff69b4;
    display: flex;
    flex-direction: column;
  }

  .home-rank-buildInfo-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-buildInfo-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-buildInfo-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
    cursor: pointer;
  }

  .home-rank-buildInfo-article {
    display: flex;
  }

  .home-rank-buildInfo-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-buildInfo-article-else {
    width: 100%;
    margin: 4px 0;
  }

  .home-rank-invest {
    //background-color: #cd5c5c;
    //border: 1px solid #9932cc;
    display: flex;
    flex-direction: column;
  }

  .home-rank-invest-title {
    display: flex;
    flex-direction: row;
  }

  .home-rank-invest-title-name {
    margin-left: 10px;
    font-size: 20px;
  }

  .home-rank-invest-title-more {
    line-height: 26.67px;
    text-align: center;
    margin-left: 10px;
    color: rgb(161 161 161);
    cursor: pointer;
  }

  .home-rank-invest-article {
    display: flex;
  }

  .home-rank-invest-article-top1 {
    margin: 4px 0;
    font-weight: bold;
  }

  .home-rank-invest-article-else {
    width: 100%;
    margin: 4px 0;
  }

  .home-rank-innovation {
    //background-color: #e9967a;
    //border: 1px solid #8b0000;

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
    cursor: pointer;
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
</style>
