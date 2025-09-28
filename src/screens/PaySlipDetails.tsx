import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button';
import { RootState } from '../redux/store';
import { formatDate } from '../utils/DateFormat';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';

type RootStackParamList = {
  PaySlipDetails: { payslipId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaySlipDetails'>;

const PayslipDetails = ({ route }: Props) => {
  const { payslipId } = route.params;

  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * find the payslip details from the user store
   */
  const payslip = useSelector((state: RootState) =>
    state.payslips.find(p => p.id === payslipId),
  );

  /**
   * if no payslip found, let the user know that the payslip could not be found
   */
  if (!payslip) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Payslip not found</Text>
      </View>
    );
  }

  const savePayslip = async () => {
    // Start the loading state to disable the button / show spinner
    setIsDownloading(true);

    try {
      // Generate a unique filename using the payslip ID and current timestamp
      const timestamp = Date.now();
      const fileName = `${payslipId}-payslip-${timestamp}.pdf`;

      // Determine destination path depending on platform
      const destPath =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/${fileName}` // iOS: app's Document directory
          : `${RNFS.DownloadDirectoryPath}/${fileName}`; // Android: Download directory

      if (Platform.OS === 'ios') {
        // iOS: get source path from main bundle
        const sourcePath = `${RNFS.MainBundlePath}/sample-payslip.pdf`;

        // Copy the PDF from the app bundle to the destination path
        await RNFS.copyFile(sourcePath, destPath);

        try {
          // Open the native Share / Save dialog so user can save to Files app
          await Share.open({
            title: 'Save Payslip',
            url: `file://${destPath}`,
            type: 'application/pdf',
            saveToFiles: true,
          });
        } catch (shareErr: any) {
          // Handle user cancelling the Share dialog gracefully
          if (
            shareErr?.message?.toLowerCase().includes('cancel') ||
            shareErr?.message?.toLowerCase().includes('did not share')
          ) {
            Toast.show('Saving cancelled by user', Toast.SHORT);
          } else {
            // Any other error is unexpected, throw it
            throw shareErr;
          }
        }
      } else {
        // Android: copy from assets folder (android/app/src/main/assets/)
        await RNFS.copyFileAssets('sample-payslip.pdf', destPath);

        // Show a short toast message to confirm file saved
        Toast.show(`PDF saved to ${destPath}`, Toast.SHORT);
      }
    } catch (err) {
      // Catch any errors from copying or sharing
      console.error('Error saving PDF', err);

      // Show toast instead of Alert to avoid Activity-related crash on Android
      Toast.show('Failed to save PDF', Toast.SHORT);
    } finally {
      // Reset loading state regardless of success or failure
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>ID: {payslip.id}</Text>
        <Text style={styles.detailText}>
          From: {formatDate(payslip.fromDate)}
        </Text>
        <Text style={styles.detailText}>To: {formatDate(payslip.toDate)}</Text>
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button
            color="#275471"
            title="Download"
            onPress={savePayslip}
            loading={isDownloading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PayslipDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 6,
  },
  notFoundText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});
