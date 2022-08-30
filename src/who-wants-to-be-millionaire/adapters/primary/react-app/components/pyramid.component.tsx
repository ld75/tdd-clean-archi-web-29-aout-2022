import { AppState } from "../../../../store/appState";
import { useSelector } from "react-redux";
import classNames from "classnames";

const pyramidSteps = [
  "200",
  "300",
  "800",
  "1.500",
  "3.000",
  "6.000",
  "12.000",
  "24.000",
  "48.000",
  "72.000",
  "150.000",
  "300.000",
  "1 MILLION",
].reverse();

export const Pyramid = () => {
  const pyramidStep = useSelector((state: AppState) => state.pyramid.step);

  return (
    <div className="bg-purple-800 mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col w-7/12 justify-center">
        <ul className="text-end">
          {pyramidSteps.map((step, index) => (
            <li
              key={step}
              className={classNames("text-white", {
                "font-bold": pyramidStep === pyramidSteps.length - index,
              })}
            >
              {step} €
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
