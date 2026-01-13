import { ExternalLink, Award } from 'lucide-react';
import { Certification } from '@/types';
import { TEMPLATE_STYLES } from '@/utils/constants';
import useResumeStore from '@/store/resumeStore';

function CertificationsPreviewSection(): JSX.Element | null {
  const { resumeData, selectedTemplate } = useResumeStore();
  const certifications = resumeData.certifications || [];
  const styles = TEMPLATE_STYLES[selectedTemplate];

  if (certifications.length === 0) return null;

  return (
    <section className="mb-8 pb-6 border-b-2 border-slate-200 last:border-0">
      <h2 className={`text-xl font-bold mb-4 pl-3 ${styles.section} ${styles.accent} flex items-center gap-2`}>
        <Award className="w-5 h-5" />
        CERTIFICATIONS
      </h2>
      
      <div className="space-y-4">
        {certifications.map((certification) => (
          <CertificationPreviewItem key={certification.id} certification={certification} />
        ))}
      </div>
    </section>
  );
}

interface CertificationPreviewItemProps {
  certification: Certification;
}

function CertificationPreviewItem({ certification }: CertificationPreviewItemProps): JSX.Element {
  const isExpired = certification.expiryDate && new Date(certification.expiryDate) < new Date();

  return (
    <div className="pl-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-bold text-slate-900 text-base">{certification.name}</h3>
            {certification.link && (
              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 print:text-blue-600"
                title="Verify Credential"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-1">{certification.issuer}</p>
          <div className="text-xs text-slate-600 flex items-center gap-3">
            <span>Issued: {certification.date}</span>
            {certification.expiryDate && (
              <span className={isExpired ? 'text-red-600 font-medium' : 'text-slate-600'}>
                {isExpired ? 'Expired' : 'Valid until'}: {certification.expiryDate}
              </span>
            )}
          </div>
          {certification.credentialId && (
            <p className="text-xs text-slate-500 mt-1">
              <span className="font-medium">Credential ID:</span> {certification.credentialId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificationsPreviewSection;
