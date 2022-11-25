import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Status from "./Status";

const Confirm = ({
  recipientsData,
  total,
  tokenBalance,
  remaining,
  approve,
  disperse,
  txStatus,
  approveStatus,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (total && tokenBalance) {
      setIsDisabled(!ethers.utils.parseUnits(tokenBalance).gt(total));
    }
  }, [total, tokenBalance]);

  return (
    <div className="pt-16">
      <h3 className="text-2xl font-light italic">4. Confirm</h3>
      <ul>
        <li>
          <div className="flex justify-between mt-4">
            <p className="italic">address</p>
            <p className="italic">amount</p>
          </div>
        </li>
        {recipientsData.length > 0 &&
          recipientsData.map((recipient) => (
            <li>
              <div className="flex justify-between mt-2">
                <p>{recipient.address}</p>
                {/* TODO: Add Horizontal line here */}
                <div className="border-b-2 border-black flex-grow-1"></div>
                <p>{ethers.utils.formatEther(recipient.value)}</p>
              </div>
            </li>
          ))}
        <li>
          <div className="flex justify-between mt-6">
            <p className="italic">total</p>
            <p className="italic">
              {total ? ethers.utils.formatEther(total) : ""}
            </p>
          </div>
        </li>
        <li>
          <div className="flex justify-between mt-2">
            <p className="italic">your balance</p>
            <p className="italic">{tokenBalance}</p>
          </div>
        </li>
        <li>
          <div
            className={`flex justify-between mt-2 ${
              isDisabled && "text-red-700"
            }`}
          >
            <p className="italic">remaining</p>
            <p className="italic">{remaining}</p>
          </div>
        </li>
      </ul>
      <div className="mt-8">
        <h3 className="text-2xl font-light italic ">5. Allowance</h3>
        <div className="mt-4 flex items-center">
          <button
            onClick={approve}
            className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer ${
              isDisabled && `disabled:cursor-default`
            }`}
            style={{
              border: "2px solid #000",
            }}
            disabled={isDisabled}
          >
            approve
          </button>
          {isDisabled && <p className="ml-4 italic">total exceeds balance</p>}
          {approveStatus && <Status txnStatus={approveStatus} />}
        </div>
        <div className="mt-6 flex items-center">
          <button
            onClick={disperse}
            disabled={isDisabled}
            className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer ${
              isDisabled && `disabled:cursor-default`
            }`}
            style={{
              border: "2px solid #000",
            }}
          >
            disperse token
          </button>
          {isDisabled && <p className="ml-4 italic">total exceeds balance</p>}
          {txStatus && <Status txnStatus={txStatus} />}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
