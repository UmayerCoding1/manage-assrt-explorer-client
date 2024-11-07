import React from "react";
import ReactPDF, {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import emImg from "./../../../assets/image/CC1e2.jpg";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    width: 70,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },

  tableColHeader: {
    width: "25%",
    borderColor: "#000",
    borderBottomColor: "grey",
    borderWidth: 1,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    padding: 5,
    fontSize: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
  },
  tableCell: {
    margin: 5,
  },
});
const PdfFile = ({ asset }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={asset.emImage} />
        <Text>{asset.emName}</Text>
        <Text style={styles.text}>{asset.emEmail}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Asset Image</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Asset name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Type</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Quantity</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Image style={styles.image} src={asset.productImage} />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{asset.productName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{asset.category}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.text}>{asset.requestQuantity}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ReactPDF.render(<PdfFile/>)
export default PdfFile;
