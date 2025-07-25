import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { T_Quote } from '@/types/quote'
import { QuoteRow } from './quoteRow/QuoteRow'
import { QuoteRowHeader } from './QuoteRowHeader/QuoteRowHeader'
import { formatDate } from '@/app/lib/formatDate'

Font.register({
  family: 'BrandonBold',
  src: '/fonts/Brandon_bld.otf',
})

Font.register({
  family: 'BrandonReg',
  src: '/fonts/Brandon_reg.otf',
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontFamily: 'BrandonReg',
    fontSize: '12px',
  },
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  imageContainer: {
    width: 200,
    height: 40,
    marginRight: 16,
    marginBottom: 8,
  },
  textBold: {
    fontFamily: 'BrandonBold',
    fontSize: '14px',
  },
  flexCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  flexCol: {
    flexDirection: 'column',
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    justifyItems: 'space-between',
    marginLeft: 8,
    marginRight: 8,
    width: '90%',
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8,
    width: '80%',
  },
  totalSection: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
    width: '90%',
  },
  totalText: {
    flexDirection: 'column',
    textAlign: 'right',
    fontFamily: 'BrandonBold',
    backgroundColor: '#f07e19',
    color: 'white',
    padding: 6,
    paddingHorizontal: 10,
    paddingLeft: 12,
    paddingTop: 9,
  },
  totalNum: {
    flexDirection: 'column',
    textAlign: 'right',
    fontFamily: 'BrandonBold',
    padding: 6,
    paddingTop: 9,
    paddingLeft: 10,
    border: '2px solid black',
  },
  termsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  termsText: {
    flexDirection: 'column',
    textAlign: 'center',
    fontFamily: 'BrandonReg',
    padding: 6,
    paddingTop: 9,
    color: 'grey',
    fontSize: '8px',
    width: '90%',
  },
})

interface PdfQuoteLayoutProps {
  currentQuote: T_Quote
}

export const PdfLayout = ({ currentQuote }: PdfQuoteLayoutProps) => {
  const quoteRows = currentQuote.QuoteRow

  const QuoteRowsJsx = quoteRows.map((quoteRow, index) => {
    return <QuoteRow key={quoteRow.id} quoteRow={quoteRow} index={index} />
  })

  return (
    <Document pageLayout="singlePage">
      {/* eslint-disable jsx-a11y/alt-text */}
      <Page size="A4" style={styles.page}>
        <View style={{ height: 16 }} fixed></View>
        <View style={styles.logoSection}>
          <View style={styles.imageContainer}>
            <Image src={`/max_volts_logo.jpg`} />
          </View>

          <View style={{ height: 8 }}></View>

          <View style={styles.flexCenter}>
            <Text style={styles.textBold}>Quote</Text>
            <View style={{ height: 8 }}></View>

            <View style={styles.invoiceDetails}>
              <View>
                <Text>{'Bill To:'}</Text>
                <Text>{currentQuote.Client.name}</Text>
                <Text>{currentQuote.Client.companyName}</Text>
                <Text>{currentQuote.Client.add1}</Text>
                <Text>{currentQuote.Client.add2}</Text>
                <Text>{currentQuote.Client.postcode}</Text>
              </View>

              <View style={styles.logoSection}>
                <Text>Quote Number: {currentQuote.quoteNum}</Text>
                <Text>Date: {formatDate(currentQuote.quoteDate)}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 32 }}></View>

          <View style={styles.flexCenter}>
            <QuoteRowHeader />
            {QuoteRowsJsx}
          </View>

          <View style={{ height: 8 }}></View>

          <View style={styles.totalSection}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Amount:</Text>
              <Text style={styles.totalNum}>
                £ {currentQuote.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{ height: 32 }}></View>

          <View style={styles.flexCenter}>
            <Text>72 Ardrossan Gardens, Worcester Park, Surrey, KT4 7AX</Text>
            <Text>Tel: 07877 695 996</Text>
            <Text>Email: MaxVoltsElectricalServices@gmail.com</Text>
          </View>

          <View style={{ height: 4 }}></View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              All work is guaranteed for one year from the invoice date. The
              NAPIT guarantee applies to all domestic and commercial work for up
              to six years. All materials are covered solely by the
              manufacturers warranties and guarantees. Any replacements will
              incur charges. For any issues or complaints, please provide
              detailed information via email to
              MaxVoltsElectricalServices@gmail.com.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
