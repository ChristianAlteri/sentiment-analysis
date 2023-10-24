
import AudioRecorder from "../components/AudioRecorder";
import ChartComponent from "../components/ChartComponent";
// import AudioRecorder2 from "../components/AudioRecorder2";
import SwiperComponent from "../components/Swiper";

const Dashboard = () => {
  return ( 
    <div className="
      flex
      flex-col
      justify-center
      text-center
      h-30vh
    ">
      {/* <SwiperComponent /> */}
      <ChartComponent />
      <AudioRecorder />

    </div>
   );
}
 
export default Dashboard;