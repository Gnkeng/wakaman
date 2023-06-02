import React from 'react'
import SelectInput from '../../input/SelectInput'
import { LOCATIONS, TRAVEL_TIME } from '../../../../constants/constant'
import Dateinput from '../../input/Dateinput';
import Button from '../../button/Button';


const OneWayModal = () => {
  return (
    <div>
      <h1 className="text-2xl">One Way</h1>

      <form className='mt-8'>
        <div className="flex gap-10">
          <SelectInput selectOptions={LOCATIONS} label="FROM" />
          <SelectInput selectOptions={LOCATIONS} label="TO" />
        </div>

        <div className="flex items-center gap-10 mt-3 mb-4">
          <div >
            <Dateinput label={"Depature Date"} width={'300px'}
            type={'date'}
            />
          </div>

          <SelectInput selectOptions={TRAVEL_TIME} label={"Arrival Time"} />
        </div>
        <div className='mt-5'>
          <Button
          text='Search'
          buttonType={'PRIMARY'}
          fullWidth={true}
          />
        </div>
      </form>
    </div>
  );
}

export default OneWayModal