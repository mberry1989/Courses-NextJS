import KontentSmartLink from "@kontent-ai/smart-link"
import { useEffect, useState } from "react";

export const useSmartLink = () => {
  const [sdk, setSdk] = useState<KontentSmartLink | null>(null);

  useEffect(() => {
    const envId = process.env.KONTENT_ENVIRONMENT_ID ?? '';

    setSdk(KontentSmartLink.initialize({
      defaultDataAttributes: {
        projectId: envId,
        languageCodename: "default",
      },
      queryParam: "ksl-preview"
    }));

    return () => sdk?.destroy()
  }, [sdk]);

  return sdk;
}