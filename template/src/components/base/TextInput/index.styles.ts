import { StyleSheet } from "react-native";
import { VERY_SMALL_DEVICE } from "../../../utils/constants";
import { wp } from "../../../utils/helpers/responsive.helpers";

const minHeight = wp("14%", 70, 60);
const styles = StyleSheet.create({
  border: {
    borderWidth: 0.4,
  },
  containerStyle: {
    alignItems: "center",
    borderColor: "silver",
    borderRadius: !VERY_SMALL_DEVICE ? wp("2%", 10) : wp("1%", 5),
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0.5,
    minHeight,
    overflow: "hidden",
  },
  error: {
    fontSize: 11,
    marginLeft: 3,
    marginTop: -5,
  },
  inputContainer: { alignItems: "center", flexDirection: "row" },
  inputStyle: {
    color: "black",
    flex: 1,
    marginTop: 2,
    minHeight,
    paddingBottom: 8,

    paddingTop: 20,
  },
  labelStyle: {
    paddingBottom: 0,
    paddingRight: 5,
    position: "absolute",
  },
  leftContainerShow: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  leftContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingRight: 5,
  },
  shadow: {
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.7)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,

    shadowRadius: 5,
  },
  textCont: { flex: 1, justifyContent: "center" },
});

export default styles;
