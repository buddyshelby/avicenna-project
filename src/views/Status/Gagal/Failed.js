import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TemplateFailed, TemplateNotFound } from "./Template"
import { reset, resetLogout } from "../../../Function/authSlice"
import './template.css'

export const MaintenanceDisplay = ({ children, buttonValue, link, reset: resetAll }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const backHandler = async (e,linkTo) => {
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

    return <div id="template--not-found">
        <TemplateNotFound/>
        <div className="template--not-found--text" onClick={backHandler}>
            <span>{children}</span>
            <div onClick={(e) => backHandler(e,link)}>{ buttonValue }</div>
        </div>
    </div>
}

export const FailedDisplay = ({ children, buttonValue, link, reset: resetAll }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const backHandler = async (e,linkTo) => {
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

    return <div id="template--failed">
        <TemplateFailed/>
        <div className="template--failed--text" onClick={backHandler}>
            <span>{children}</span>
            <div onClick={(e) => backHandler(e,link)}>{ buttonValue }</div>
        </div>
    </div>
}