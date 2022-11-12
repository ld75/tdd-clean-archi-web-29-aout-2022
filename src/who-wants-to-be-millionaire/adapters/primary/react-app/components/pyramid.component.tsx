import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store/reduxStore";
import {AppState} from "../../../../store/appState";
import {useEffect} from "react";
import classNames from "classnames";

export const Pyramid = () => {

  const valeurPyramide = useSelector((state:AppState)=>{return state.pyramidState.pyramid.valeur}); // pour recuperer une feuille du state
  let pyramidesteps=["150.000","72.000","48.000","24.000","12.000","6.000","3.000","1.500","800","500","200"];
    return (
    <div className="bg-purple-800 mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col w-7/12 justify-center">
        <ul className="text-end">
          {pyramidesteps.map((label, index) => (<li key={label} className={classNames("text-white", {"font-bold": valeurPyramide === pyramidesteps.length - index,})}>{label} €</li>))}
        </ul>
      </div>
    </div>
  );
};
