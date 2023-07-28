import { StyleSheet } from "react-native";
import { VERY_SMALL_DEVICE } from "../../../utils/constants";
import { wp } from "../../../utils/helpers/responsive.helpers";

const minHeight = wp("14%", 70, 60);
const styles = StyleSheet.create({
  containerStyle: {
    margin: 0.5,
    overflow: "hidden",
    borderRadius: !VERY_SMALL_DEVICE ? wp("2%", 10) : wp("1%", 5),
    borderWidth: 0.5,
    borderColor: "silver",
    minHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainerShow: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainerStyle: {
    padding: 8,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    position: "absolute",
    paddingRight: 5,
    paddingBottom: 0,
  },
  inputStyle: {
    marginTop: 2,
    paddingTop: 20,
    minHeight,
    flex: 1,
    color: "black",

    paddingBottom: 8,
  },
  textCont: { flex: 1, justifyContent: "center" },
  error: {
    fontSize: 11,
    marginLeft: 3,
    marginTop: -5,
  },
  border: {
    borderWidth: 0.4,
  },
  shadow: {
    shadowColor: "rgba(0,0,0,0.7)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
});

export default styles;
