<script>
  import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";

  import dayjs from "dayjs";
  dayjs.locale("id");

  import NProgress from "nprogress";
  import "nprogress/nprogress.css";
  import "dayjs/locale/id";

  beforeNavigate(({ type, cancel, willUnload }) => {
    // console.log("beforeNavigate...", type, willUnload);

    if (
      type === "leave"
      //  || type === "link"
    ) {
      NProgress.done();
      return;
      //
    } else {
      // type === "goto"
      NProgress.start();
    }
  });

  afterNavigate(props => {
    // console.log("afterNavigate...", props);

    NProgress.done();
  });

  onNavigate(navigation => {
    // console.log("onNavigate...");
    if (!document.startViewTransition) return;

    return new Promise(resolve => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>
