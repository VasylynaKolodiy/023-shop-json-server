import {useDispatch} from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {userActions} from "../store/products/user.slice";

const actions = {
  ...userActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}