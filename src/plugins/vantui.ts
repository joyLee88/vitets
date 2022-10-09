import { App } from "vue";
import { Button } from "vant";
const Vant = {
  install: (app: App): void => {
    app.use(Button);
  },
};
export default Vant;
