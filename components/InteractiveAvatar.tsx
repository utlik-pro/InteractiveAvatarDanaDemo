import {
  AvatarQuality,
  StartAvatarRequest,
} from "@heygen/streaming-avatar";

import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { StreamingAvatarProvider } from "./logic";

import { AVATARS } from "@/app/lib/constants";

export default function InteractiveAvatar() {
  return (
    <StreamingAvatarProvider>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <AvatarVideo />
        <AvatarControls />
        <MessageHistory />
      </div>
    </StreamingAvatarProvider>
  );
}
