
import "./Preloader.scss";

interface ComponentProps {
    isActive?: boolean; 
}

const Preloader: React.FC<ComponentProps> = ({ isActive }) => {
  return (
    <div className={ isActive ? 'preloader preloader_active' : 'preloader'}>
      <p>Loading UI...</p>
    </div>
  );
};

export default Preloader;