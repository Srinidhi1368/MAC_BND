import React from 'react'
import AddEmp from './EmpAdd.module.css'


function EmployeeAdd() {
    return (
        <div>
            <p>Add  a New Staff</p>
            <div className={AddEmp.empMain}>
                <div className={`${AddEmp.sub_conatiner} ${AddEmp.container1}`}>


                </div>
                <div className={`${AddEmp.sub_conatiner}`}></div>
                <div className={`${AddEmp.sub_conatiner}`}></div>
            </div>
        </div >
    )
}

export default EmployeeAdd
