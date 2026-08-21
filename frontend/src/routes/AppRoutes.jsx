import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import TodoList from '../pages/TodoList';
import TodoDetail from '../pages/TodoDetail';
import ProtectedRoute from './ProtectedRoute';
import TodoForm from '../pages/TodoForm';

function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/login' replace/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path='/todos' element={<TodoList/>}/>
                    <Route path='/todos/:id' element={<TodoDetail/>}/>
                    <Route path='/todos/create' element={<TodoForm/>}/>
                    <Route path='/todos/:id/edit' element={<TodoForm/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;