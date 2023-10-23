
import AudioRecorder from "../components/AudioRecorder";
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
      <SwiperComponent />
      <AudioRecorder />

    </div>
   );
}
 
export default Dashboard;