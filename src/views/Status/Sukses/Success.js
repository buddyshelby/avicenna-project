import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { reset, resetLogout } from "../../../Function/authSlice"
import { TemplateSuccess } from "./Template"
import './template.css'

export const SuccessDisplay = ({ children, buttonValue, link, reset: resetAll }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const backHandler = (e,linkTo) => {
        if (resetAll)
            dispatch(resetLogout())
        else
            dispatch(reset())
        if (linkTo !== undefined)
        {
            if (linkTo.split('http')[1] !== undefined)
                window.location.href = linkTo;
            else
                navigate(`${linkTo}`)
        }
    }

    return <div id="template--success">
        <TemplateSuccess/>
        <div className="template--success--text" onClick={backHandler}>
            <span>{children}</span>
            <div onClick={(e) => backHandler(e, link)}>{ buttonValue }</div>
        </div>
    </div>
}