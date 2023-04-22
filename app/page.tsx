import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">BetterGPT</h1>

      <div className="md:flex space-x-2 text-center md:max-w-2xl lg:max-w-3xl gap-3.5">
        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="infoText">&quot;Explain Something to me&quot;</p>
            <p className="infoText">
              &quot;What is the difference between a dog and a cat?&quot;
            </p>
            <p className="infoText">
              &quot;What is the color of the sun?&quot;
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="infoText">Change the OpenAI Model to use</p>
            <p className="infoText">
              Messages are stored in Firebase&apos;s Firestore
            </p>
            <p className="infoText">
              Hot Toast notifications when OpenAI is thinking!
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="infoText">
              May occasionaly generate incorrect information
            </p>
            <p className="infoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
