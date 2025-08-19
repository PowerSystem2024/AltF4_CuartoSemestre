package UTN.datos;

import UTN.dominio.Estudiante;


import static UTN.conexion.Conexion.getConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Metodo listar
    public List<Estudiante> listarEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();
        //Creamos algunos objetos que son necesarios para comunicarnos con la base de datos
        PreparedStatement ps; // Envia la sentencia a la base de datos
        ResultSet rs; //Obtenemos el resultado de la base de datos
        //Creamos un objeto de tipo conexion
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 ORDER BY idestudiantes2025";
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2025"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                //FALTA AGREGARLO A LA LISTA
                estudiantes.add(estudiante);
            }
        } catch (Exception e){
            System.out.println("Ocurrio un error al seleccionar datos: "+e.getMessage());
        }
        finally {
            try{
                con.close();
            } catch (Exception e){
                System.out.println("Ocurrio un error al cerrar la conexion:");
            }
        }//Fin finally
        return estudiantes;
    }// FIn metodo listar

    //Metodo por id -> fin by id
    public boolean buscarEstudiantePorId(Estudiante estudiante){
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 WHERE idestudiantes2025=?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if (rs.next()){
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setEmail(rs.getString("email"));
                estudiante.setTelefono(rs.getString("telefono"));
                return true; //Se encontro un registro
            } //FIn if
        } catch (Exception e ){
            System.out.println("Ocurrio un error al buscar estudiante "+e.getMessage());
        }
        finally {
            try{
                con.close();
            } catch (Exception e){
                System.out.println("Ocurrio un error al cerrar la conexion"+e.getMessage());
            }//Fin Catch
        }//Fin finally
        return false;
    }

    //Metodo agregar un nuevo estudiante
    public boolean agregarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes2025 (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        } catch (Exception e ){
            System.out.println("Ocurrio un error al agregar estudiante: "+e.getMessage());
        }
        finally {
            try {
                con.close();
            } catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }
        }

        return false;
    }// Fin metodo agregar estudiante
    //Metodo para modificar estudiante

    public boolean modificarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiantes2025 SET nombre=?, apellido=?, telefono=?, email=? WHERE idestudiantes2025=?,";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1,estudiante.getNombre());
            ps.setString(2,estudiante.getApellido());
            ps.setString(3,estudiante.getTelefono());
            ps.setString(4,estudiante.getEmail());
            ps.setInt(5,estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (Exception e){
            System.out.println("Error al modificar estudiante: "+e.getMessage());
        }//Fin CATCH
        finally {
            try {
                con.close();
            } catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            } // Fin catch
        } //FIn finally
        return false;
    } // FIN METODO modificar estudiante

    public boolean eliminarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiantes2025 WHERE idestudiantes2025=?";
        try{
            ps = con.prepareStatement(sql);
            ps.setInt(1,estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (Exception e){
            System.out.println("Error al eliminar estudiante: "+e.getMessage());
        }
        finally {
            try{
                con.close();
            } catch (Exception e){
                System.out.println("Error al cerrar la conexion: "+e.getMessage());
            }
        }
        return false;
    }

    public static void main(String[] args) {
        var estudianteDao = new EstudianteDAO();

        //Modificaar estudiante
        //var estudianteModificado = new Estudiante(1,"Juan Carlos", "Juarez", "5441421421", "juan@mail.com");
        //var modificado = estudianteDao.modificarEstudiante(estudianteModificado);
        //if (modificado)
        //    System.out.println("Estudiante modificado: "+estudianteModificado);
        //else
        //    System.out.println("No se modifico el estudiante: "+estudianteModificado);

        //Agregar estudiante
        //var nuevoEstudiante = new Estudiante("Carlos", "Lara", "523413213131", "carlosl@mail.com");
        //var agregado = estudianteDao.agregarEstudiante(nuevoEstudiante);
        //if(agregado)
        // System.out.println("Estudiante agregado: "+nuevoEstudiante);
        // else
        //

        //Eliminar estudiante con id 3
        // var estudianteEliminar = new Estudiante(3);
        //var eliminado = estudianteDao.eliminarEstudiante(estudianteEliminar);
        //if (eliminado)
        //    System.out.println("Estudiante eliminado: "+estudianteEliminar);
        //else
        //    System.out.println("No se elimino estudiante: "+estudianteEliminar);

        //Listar los estudiantes
        System.out.println("Listado de estudiantes: ");
        List<Estudiante> estudiantes = estudianteDao.listarEstudiantes();
        estudiantes.forEach(System.out::println); // Funcion lambda para imprimir

        // System.out.println("No se a agregado estudiante: "+nuevoEstudiante );

        //Buscar por id
        // var estudiante1 = new Estudiante(1);
        // System.out.println("Estudiantes antes de la busqueda: "+estudiante1);
        // var encontrado = estudianteDao.buscarEstudiantePorId(estudiante1);
        // if (encontrado)
        //    System.out.println("Estudiante encontrado: "+estudiante1);
        // else
        //    System.out.println("No se encontro el estudiante: "+estudiante1.getIdEstudiante());

    }

}
