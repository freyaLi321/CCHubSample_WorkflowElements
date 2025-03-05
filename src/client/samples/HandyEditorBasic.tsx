// HandyEditorBasic.tsx
import { useEffect, useState } from "react";
import Preloader from "../components/preloader/Preloader.js";
import { loadScript, loadStyle } from "../shared/asset-loaders.js";
import { HandyEditorBaseUrl } from "../constants/urls.js";
import { ServerApiService } from "../shared/server-api-service.js";
import { handyEditorBasicSampleSettings } from "../constants/configuration.js";

const HandyEditorBasic = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const userId = "testUserId42";
  const orderId = "42";

  useEffect(() => {
    (async () => {
      const [style, script] = await Promise.all([
        loadStyle(`${HandyEditorBaseUrl}/styles.css`),
        loadScript(`${HandyEditorBaseUrl}/index.js`)
      ]);
      setIsScriptLoaded(true);

      return () => {
        document.head.removeChild(style);
        document.body.removeChild(script);
      };
    })();
  }, []);

  // Handy Editor initialization
  useEffect(() => {
    if (isScriptLoaded) {
      (async () => {
        const [token, productInfo] = await ServerApiService.getStartPersonalizationData(userId);

        const handyEditor = document.querySelector("au-handy-editor") as any;
        handyEditor?.init({
          configVersion: 2,
          integration: {
            tenantId: productInfo.tenantId,
            storefrontId: productInfo.storefrontId,
            cchubApiGatewayUrl: productInfo.cchubApiGatewayUrl,
            user: {
              id: userId,
              token: token,
            }
          },
          input: {
            designTemplateId: "61cd31a43056bcc33e919927",
            previewMockupIds: ["643d05f7c121897df4598271", "643d05fbc121897df4598277"]
          },
          settings: handyEditorBasicSampleSettings,
          resources: {},
          localization: { language: "en" }
        });

        handyEditor?.addEventListener("load", () => {
          setIsComponentLoaded(true);
        });

        // get output data from the editor when click add to cart
        handyEditor?.addEventListener("addtocart", async (e: CustomEvent) => {
          const editorOutput = e.detail as any;
          const requestBody = {
            privateDesignId: editorOutput.properties._stateId[0],
            userId: editorOutput.properties._userId,
            orderId: orderId
          };

          const project = await ServerApiService.saveProject(requestBody);
          handyEditor.showLoader(false);
          alert(`You have successfully created a project ${project.id} (name '${project.name}').`);
        });
      })();
    }
  }, [isScriptLoaded]);

  return (
    <div className="handy-editor">
      <Preloader isActive={!isComponentLoaded} />
      <au-handy-editor></au-handy-editor>
    </div>
  );
};

export default HandyEditorBasic;
