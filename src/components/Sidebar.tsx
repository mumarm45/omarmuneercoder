
import TemplateSelector from './TemplateSelector';
import QuickActions from './QuickActions';

function Sidebar(): JSX.Element {
  return (
    <div className="space-y-6">
      <TemplateSelector />
      <QuickActions />
    </div>
  );
}

export default Sidebar;
