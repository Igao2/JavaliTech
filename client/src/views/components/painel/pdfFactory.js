import React from 'react';

import String from '../../../assets/values/string.json';

import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';


// Create styles
const styles = StyleSheet.create({
    page: {
        padding: "1cm"
    },
    head: {
        flexDirection: 'row',
        height: "20%",
    },
    section: {
        width: "33.3%",
        height: "100%",
        padding: 10,
        flexGrow: 1,
        display: "grid",
        justifyContent: "center",
        justifyItems: "center"

    },
    sectionLine: {
        width: "100%",
        flexDirection: 'row',
    },
    ItemColAvatar: {
        width: "25%",
        textAlign: "center",
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        padding: "10px",
        backgroundColor: '#efefef',
        height: "100%",
        alignContent: "center",
    },
    ProfilePhoto: {
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #666",
        width: "110px",
        height: "110px",
        margin: "auto",
    },
    userName: {
        marginBottom: 10,
    },
    infosUser: {
        marginBottom: 10,
    },
    osIndentification: {
        backgroundColor: '#efefef',
        textAlign: "center",
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        height: "100%"
    },
    QuadrosOS: {
        backgroundColor: "#fff",
        padding: "10px",
        border: "1px solid #abaeb1",
        margin: "0px 0px 10px",
        borderRadius: "5px"
    },
    fontWeight: { fontWeight: "500" },
    h2: { fontSize: "16px", },
    h4: { fontSize: "14px", },
    h6: { fontSize: "12px", },
    h8: { fontSize: "10px", },
    marginBottom5: { marginBottom: 5, },
    marginBottom10: { marginBottom: 10, },
    marginLeft5: { marginLeft: 5, },
    marginLeft10: { marginLeft: 10, },
    textJustify: { textAlign: "justify" },
    hr: {
        height: "1px",
        backgroundColor: "#c8c9ca",
        margin: "5px 0 10px"
    },
    col: {
        width: "50%",
        paddingRight: "12px",
        paddingLeft: "12px",
    },
    intoCol: {
        padding: "20px",
        textAlign: "center",
        backgroundColor: '#efefef',
    },
    footer: {
        width: "111%",
        gridArea: "f",
        backgroundColor: "#2228",
        padding: "10px 20px",
        color: "#fff",
        textAlign: "center",
        position: "absolute",
        bottom: "0px"
    }
});

Font.register({
    family: 'Ubuntu',
    src: `https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap`,
});

const OsPdf = (props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
            
                <View style={[styles.head, styles.QuadrosOS]}>
                    <View style={styles.ItemColAvatar}>
                        <View style={styles.ProfilePhoto}>
                            <Image
                                style={{
                                    position: "absolute",
                                    left: props.user_photo[1].left + "px",
                                    top: props.user_photo[1].top + "px",
                                    width: props.user_photo[1].width + "%"
                                }}
                                src={props.user_photo[0]}
                            />
                        </View>
                    </View>
                    <View style={styles.section}>

                        <Text style={[styles.userName, styles.h2, styles.fontWeight]}>
                            {props.user_name}
                        </Text>

                        <Text style={[styles.infosUser, styles.h6]}>
                            {props.user_address.rua}, {props.user_address.bairro}, {props.user_address.cidade}, {props.user_address.estado}
                        </Text>
                        <Text style={[styles.infosUser, styles.h6]}>
                            {props.user_telephone}
                        </Text>

                        <Text style={[styles.infosUser, styles.h6]}>
                            {props.user_email}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.osIndentification}>
                            <Text style={styles.h6}>{String.osCodeAcess}:</Text>
                            <Text style={[styles.h4, styles.fontWeight]}>{props.service_order_id}</Text>
                            <Text style={styles.h6}>{String.osPassAcess}:</Text>
                            <Text style={[styles.h4, styles.fontWeight]}>{props.senha}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.QuadrosOS}>
                    <Text style={[styles.h4, styles.fontWeight, styles.marginBottom10]}>{String.osCATinfo}:</Text>

                    <View style={styles.hr} />

                    <View style={styles.marginLeft10}>
                        <Text style={[styles.h6, styles.marginBottom5]}>{String.owner_name}: {props.owner_name}</Text>

                        <Text style={[styles.h6, styles.marginBottom5]}>{String.owner_information}: {props.owner_information}</Text>
                    </View>
                </View>
                <View style={styles.QuadrosOS}>

                    <Text style={[styles.h4, styles.fontWeight, styles.marginBottom10]}>{String.osInfoService}:</Text>
                    <View style={styles.hr} />

                    <Text style={[styles.h6, styles.marginBottom5]}>{String.device_name}: {props.device_name}</Text>
                    <View style={styles.hr} />

                    <Text style={styles.h6}>{String.description}:</Text>
                    <Text style={[styles.h6, styles.marginBottom5, styles.textJustify, styles.marginLeft5]}>{props.description}</Text>
                    <View style={styles.hr} />

                    <View style={styles.sectionLine}>
                        <View style={styles.col}>
                            <View style={styles.intoCol}>
                                <Text style={styles.h8}>{String.delivery_date}: {props.delivery_date ? props.delivery_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</Text>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <View style={styles.intoCol}>
                                <Text style={styles.h8}>{String.completion_date}: {props.completion_date ? props.completion_date.replace(/([0-9]+)-([0-9]+)-([0-9]+)T(\S+)/, "$3/$2/$1") : null}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr} />

                    <Text style={styles.h6}>{String.service_value}:  <Text style={styles.fontWeight}>{String.tipoMoeda} {props.service_value}</Text></Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.h6}>{String.devs}</Text>
                </View>
            </Page>
        </Document>
    )
};

export default OsPdf;