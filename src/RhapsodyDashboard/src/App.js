import Tabs from "./lib/modules/Tabs/Tabs.js";
import CopyrightOrLicense from "./lib/modules/Copyright/Copyright.js";
import AboutServer from "./lib/modules/AboutServer/AboutServer.js";
import AboutThisRhapsody from "./lib/modules/AboutThisRhapsody/AboutThisRhapsody.js";
import BotFuctions from "./lib/modules/BotFuctions/BotFuctions.js";
function App() {
     return (
          <div>
               <Tabs tabids={["Bot Functions", "About Server", "About this Rhapsody", "Copyright"]}>
                    <div tabid="Bot Functions"><BotFuctions /></div>
                    <div tabid="About Server"><AboutServer /></div>
                    <div tabid="About this Rhapsody"><AboutThisRhapsody /></div>
                    <div tabid="Copyright"><CopyrightOrLicense /></div>
               </Tabs>
          </div>
     );
}

export default App;