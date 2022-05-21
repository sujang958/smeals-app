import React, { Component, FC } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { BLACK } from "../styles/theme"
import OSSES from "../oss.json"
import OSSStyles from "../styles/ossStyles"
import Text from "../components/text"

const OSSSCreen: FC = () => {
  class OSSItem extends Component<any> {
    constructor(public props: any) {
      super(props)
    }

    shouldComponentUpdate() {
      return false
    }

    render() {
      return (
        <View style={OSSStyles.OSSItemContainer}>
          <Text style={OSSStyles.OSSItemTitle}>
            {this.props.oss.libraryName}
          </Text>
          <Text style={OSSStyles.OSSItemVersion}>{this.props.oss.version}</Text>
          <Text style={OSSStyles.OSSItemLicense}>
            {typeof this.props.oss._license === "string"
              ? this.props.oss._license
              : `${this.props.oss._license.type} ${this.props.oss._license.url}`}
          </Text>
          <View style={OSSStyles.OSSItemLicenseContainer}>
            <Text>{this.props.oss._licenseContent ?? ""}</Text>
          </View>
        </View>
      )
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: BLACK,
      }}
    >
      <View style={OSSStyles.container}>
        <FlatList
          data={OSSES}
          renderItem={({ item }) => {
            return <OSSItem oss={item} />
          }}
          keyExtractor={(_, i) => String(i)}
          initialNumToRender={15}
        />
      </View>
    </SafeAreaView>
  )
}

export default OSSSCreen
