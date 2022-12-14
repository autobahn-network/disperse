import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

import Disperse from "../artifacts/Disperse.json";
import { parseText } from "../utils/index";
import Recipients from "./Recipients";
import ConfirmNativeToken from "./ConfirmNativeToken";
import { NetworkContext } from "../App";
import { disperseAddresses } from "../utils/constants";

const NativeToken = ({ address }) => {
  const [nativeTokenBalance, setNativeTokenBalance] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [total, setTotal] = useState(null);
  const [recipientsData, setRecipientsData] = useState([]);
  const [remaining, setRemaining] = useState(null);
  const { chainId } = useContext(NetworkContext);
  const [txStatus, setTxStatus] = useState(null);

  const getNativeTokenBalance = async () => {
    const { ethereum } = window;
    if (!nativeTokenBalance) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      let nativeTokenBalance = await provider.getBalance(address);
      nativeTokenBalance = ethers.utils.formatEther(nativeTokenBalance);
      setNativeTokenBalance(nativeTokenBalance);
    }
  };

  useEffect(() => {
    getNativeTokenBalance();
  }, []);

  useEffect(() => {
    setRecipientsData(parseText(textValue));
  }, [textValue]);

  useEffect(() => {
    if (recipientsData.length > 0) {
      let newTotal = recipientsData[0].value;
      for (let i = 1; i < recipientsData.length; i++) {
        newTotal = newTotal.add(recipientsData[i].value);
      }
      setTotal(newTotal);
    } else {
      setTotal(null);
    }
  }, [recipientsData]);

  const disperseNativeToken = async () => {
    try {
      setTxStatus(null);
      const { ethereum } = window;
      if (ethereum && disperseAddresses[chainId]) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const disperseContract = new ethers.Contract(
          disperseAddresses[chainId],
          Disperse.abi,
          signer
        );

        const recipients = recipientsData.map((recipient) => recipient.address);
        const values = recipientsData.map((recipient) => recipient.value);

        console.log("Dispersing TXL now");
        console.log(total);
        const txn = await disperseContract.disperseNative(recipients, values, {
          value: total,
        });
        setTxStatus({
          hash: txn.hash,
          status: "pending",
        });
        await txn.wait();
        setTxStatus({
          hash: txn.hash,
          status: "success",
        });
        console.log("Completed dispersing TXL");
      }
    } catch (error) {
      console.log("error occured while dispersing TXL");
      console.log(error);
    }
  };

  useEffect(() => {
    if (nativeTokenBalance && total) {
      const tokenBalance = ethers.utils.parseEther(nativeTokenBalance);
      const remaining = tokenBalance.sub(total);
      setRemaining(ethers.utils.formatEther(remaining));
    } else {
      setRemaining(null);
    }
  }, [total]);

  return (
    <p className="pt-4 text-l font-light italic">
      you have {nativeTokenBalance} <span className="pt-1 text-sm">TXL</span>
      <Recipients
        textValue={textValue}
        setTextValue={setTextValue}
        tokenSymbol={"TXL"}
      />
      {recipientsData.length > 0 && (
        <ConfirmNativeToken
          recipientsData={recipientsData}
          total={total}
          disperse={disperseNativeToken}
          tokenBalance={nativeTokenBalance}
          remaining={remaining}
          txStatus={txStatus}
        />
      )}
    </p>
  );
};

export default NativeToken;
