import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../../public/img/typing.png";
import benefitTwoImg from "../../../public/img/hierarchy.png";
import benefitThreeImg from "../../../public/img/tracking.png";

const benefitOne = {
  title: "Generate with Ease",
  image: benefitOneImg,
  bullets: [
    {
      title: "Leverage our powerful Language Model (LLM) to automatically generate personalized applications and letters based on your input.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Refine the draft to your preferences, ensuring a professional and personalized touch.",
      icon: <ChartBarSquareIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Set your Hierarchy",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Create a custom workflow that fits your specific needs.",
      icon: <CursorArrowRaysIcon />,
    },
    {
      title: "Set the sequence of approvals for your application, involving relevant stakeholders like coordinators, department heads, or principals.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Dark & Light Mode",
      icon: <SunIcon />,
    },
  ],
};

const benefitThree = {
  title: "Real-time Tracking:",
  image: benefitThreeImg,
  bullets: [
    {
      title: "Track the progress of your application every step of the way.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "The intuitive interface provides clear visibility into the approval process.",
      icon: <ChartBarSquareIcon />,
    },
  ],
};

export { benefitOne, benefitTwo, benefitThree };
