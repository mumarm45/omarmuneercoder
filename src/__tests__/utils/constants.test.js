import { TEMPLATES, TEMPLATE_STYLES } from '../../utils/constants';

describe('Constants', () => {
  describe('TEMPLATES', () => {
    it('should have 3 templates', () => {
      expect(TEMPLATES).toHaveLength(3);
    });

    it('should have required properties for each template', () => {
      TEMPLATES.forEach(template => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('color');
      });
    });

    it('should have unique template ids', () => {
      const ids = TEMPLATES.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should contain expected template ids', () => {
      const ids = TEMPLATES.map(t => t.id);
      expect(ids).toContain('modern');
      expect(ids).toContain('classic');
      expect(ids).toContain('minimal');
    });
  });

  describe('TEMPLATE_STYLES', () => {
    it('should have styles for all template ids', () => {
      TEMPLATES.forEach(template => {
        expect(TEMPLATE_STYLES).toHaveProperty(template.id);
      });
    });

    it('should have required style properties for each template', () => {
      Object.values(TEMPLATE_STYLES).forEach(style => {
        expect(style).toHaveProperty('header');
        expect(style).toHaveProperty('accent');
        expect(style).toHaveProperty('accentBg');
        expect(style).toHaveProperty('section');
      });
    });

    it('should have valid CSS classes', () => {
      Object.values(TEMPLATE_STYLES).forEach(style => {
        // Check that each style property is a non-empty string
        expect(typeof style.header).toBe('string');
        expect(style.header.length).toBeGreaterThan(0);
        
        expect(typeof style.accent).toBe('string');
        expect(style.accent.length).toBeGreaterThan(0);
        
        expect(typeof style.accentBg).toBe('string');
        expect(style.accentBg.length).toBeGreaterThan(0);
        
        expect(typeof style.section).toBe('string');
        expect(style.section.length).toBeGreaterThan(0);
      });
    });

    it('should have border styles for sections', () => {
      Object.values(TEMPLATE_STYLES).forEach(style => {
        expect(style.section).toContain('border');
      });
    });

    it('should have text color classes for accent', () => {
      Object.values(TEMPLATE_STYLES).forEach(style => {
        expect(style.accent).toContain('text-');
      });
    });

    it('should have background color classes for accentBg', () => {
      Object.values(TEMPLATE_STYLES).forEach(style => {
        expect(style.accentBg).toContain('bg-');
      });
    });
  });
});
