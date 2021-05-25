<template>
  <v-container class="start">
    <h1>This is a start page</h1>
    <v-container>
      <v-btn @click="DoCapture()">capture</v-btn>
      <video ref="video" id="video" width="960" height="720" autoplay></video>
      <canvas ref="canvas" id="canvas" width="320" height="240"></canvas>
    </v-container>
    <v-btn>시작하기</v-btn>
    <v-btn>일시정지</v-btn>
    <v-btn>종료하기</v-btn>
    <ResultModal />
  </v-container>
</template>
<script>
import html2canvas from 'html2canvas';
import ResultModal from '@/components/start/ResultModal';
export default {
  name: 'Start',
  components: {
    ResultModal,
  },
  data() {
    return {};
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
      });
    }
  },
  methods: {
    DoCapture() {
      var context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.video, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.partShot();
    },
    partShot() {
      //특정부분 스크린샷
      html2canvas(this.$refs.canvas)
        //id container 부분만 스크린샷
        .then((canvas) => {
          //jpg 결과값
          this.drawImg(canvas.toDataURL('image/jpeg'));
          //이미지 저장
          // saveAs(canvas.toDataURL(), 'file-name.jpg');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawImg(imgData) {
      console.log(imgData);
      console.log(typeof imgData);
      //imgData의 결과값을 console 로그롤 보실 수 있습니다.
      return new Promise(
        function reslove() {
          //내가 결과 값을 그릴 canvas 부분 설정
          var ctx = this.$refs.canvas.getContext('2d');
          //canvas의 뿌려진 부분 초기화
          ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

          var imageObj = new Image();
          imageObj.onload = function() {
            ctx.drawImage(imageObj, 10, 10);
            //canvas img를 그리겠다.
          };
          imageObj.src = imgData;
          //그릴 image데이터를 넣어준다.
        },
        function reject() {}
      );
    },
  },
};
</script>
<style></style>
